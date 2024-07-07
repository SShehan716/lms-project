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
        return { message: error.message };
    }
}

//login a user
exports.loginUser = async ({email, password}) => {
    try{
        const userExists = await User.findOne({email});

        if(!userExists){
            throw Error('Invalid Email');
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

        if(!isPasswordCorrect){
            throw Error('Invalid Password');
        }

        const token = jwt.sign({userId: userExists._id, name: userExists.name, role: userExists.role, email: userExists.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return { token, user: { id: userExists._id, name: userExists.name, email: userExists.email, role: userExists.role } };

    }catch(error){
        return { message: error.message };
    }
}

// get user by Email
exports.getUserByEmail = async (email) => {
    try{
        const user = await User.findOne({email}).select('-password');
        if(!user){
            throw Error('User not found');
        }
        return user;
    }catch(error){
        return { message: error.message };
    }
}