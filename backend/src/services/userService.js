const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register a new yser
exports.registerUser = async ({name, email, password, role}) => {
    try{
        const userExists = await User.findOne({email});

        if(userExists){
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        return newUser;
    }catch(error){
        console.error(error);
    }
}


//login a user
exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userExists = await User.findOne({email});

        if(!userExists){
            return res.status(400).json({message: 'Invalid Email'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid Password'});
        }

        const token = jwt.sign({userId: userExists._id, name: userExists.name, role: userExists.role, email: userExists.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({ token, user: { id: userExists._id, name: userExists.name, email: userExists.email, role: userExists.role } });

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

// get user by Email
exports.getUserByEmail = async (req, res) => {
    try{
        const user = await User.findOne({email: req.params.email}).select('-password');
        if(!user){
            return res.status(404).json({message: 'User Not Found'});
        }
        res.status(200).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}