const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

//register a new yser
exports.registerUser = async ({name, email, password, role}) => {
    try{
        const userExists = await User.findOne({email});

        if(userExists && userExists.isVerified){
            throw new Error('User already exists');
        }else if(userExists && !userExists.isVerified){
            throw new Error('User already exists but not verified');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken,
            isVerified: false
        });

        await newUser.save();

        const verificationUrl = `${process.env.CLIENT_URL}/verify/${newUser.verificationToken}`;

        sendVerificationEmail(email, verificationUrl);

        return newUser;
    }catch(error){
        return { message: error.message };
    }
}

//verify a user by link
exports.verifyUserByLink = async (token) => {
    try {
        const user = await User.findOneAndUpdate(
            { verificationToken: token },
            { isVerified: true, verificationToken: null }, // Clear the token after verification
            { new: true }
        );

        if (!user) {
            throw new Error('Invalid verification token');
        }

        return user;
    } catch (error) {
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