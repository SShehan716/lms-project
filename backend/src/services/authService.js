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
            userEmail: savedUser.email,
            token: crypto.randomBytes(32).toString('hex')
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
            this.requestVerificationEmail(verificationToken.userEmail)
            throw new Error('Verification token expired & sent again');
        }

        const user = await User.findOneAndUpdate({ email: verificationToken.userEmail }, { emailVerifiedAt: Date.now() });

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
        } else if(userExists && !userExists.emailVerifiedAt){
            throw Error('User not verified');
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

// request verification email again
exports.requestVerificationEmail = async (email) => {
    try{
        const user = await User.findOne({email});

        if(!user){
            throw Error('User not found');
        }else if(user && user.emailVerifiedAt){
            throw Error('User already verified');
        }

        const verificationToken = await VerificationToken.findOne({ userEmail: email});

        if(verificationToken && verificationToken.expiresAt > Date.now()){
            const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken.token}`;
            sendVerificationEmail(email, verificationUrl);
        }else if(verificationToken && verificationToken.expiresAt < Date.now()){
            const newVerificationToken = crypto.randomBytes(32).toString('hex')
            await VerificationToken.updateOne({ userEmail: email }, { token: newVerificationToken, expiresAt: Date.now() + 3600000 });

            const verificationUrl = `${process.env.CLIENT_URL}/verify/${newVerificationToken.token}`;
            sendVerificationEmail(email, verificationUrl);
        }else if(!verificationToken){
            const newVerificationToken = new VerificationToken({
                userEmail: email,
                token: crypto.randomBytes(32).toString('hex')
            });

            await newVerificationToken.save();

            const verificationUrl = `${process.env.CLIENT_URL}/verify/${newVerificationToken.token}`;
            sendVerificationEmail(email, verificationUrl);
        }

        return user;

    }catch(error){
        return { message: error.message };
    }
}