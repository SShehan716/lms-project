const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

//register a new user
exports.registerUser = async ({name, email, password, role}) => {
    try{
        const userExists = await User.findOne({email});

        if(userExists && userExists.isVerified){
            throw new Error('User already exists');
        }else if(userExists && !userExists.isVerified){
            throw new Error('User already exists but not verified');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: false
        });

        const savedUser = await newUser.save();

        const verificationToken = new VerificationToken({
            userId: savedUser._id,
            token: crypto.randomBytes(16).toString('hex')
        })

        await verificationToken.save();

        const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken.token}`;

        sendVerificationEmail(email, verificationUrl);

        return newUser;
    }catch(error){
        return { message: error.message };
    }
}

//verify a user by link
exports.verifyUserByLink = async (token) => {
    try {

        const verificationToken = await VerificationToken.findOne({ token });

        if (!verificationToken) {
            throw new Error('Invalid verification token');
        }else if(verificationToken.expiresAt < Date.now()){
            throw new Error('Verification token expired');
        }

        const user = await User.findByIdAndUpdate(verificationToken.userId, { emailVerifiedAt: Date.now() });

        if (!user) {
            throw new Error('User not found');
        }

        await VerificationToken.deleteOne({ token });

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