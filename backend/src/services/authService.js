const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const StudentInfo = require('../models/StudentInfo');
const StudentRegistration = require('../models/StudentRegistration');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

//register a new user
exports.registerUser = async (data) => {
  console.log(data);
    // Check if the user exists
    const email = data.email;
    const userExists = await User.findOne({email});
    if (userExists && userExists.isVerified) {
      throw new Error('User already exists');
    } else if (userExists && !userExists.isVerified) {
      throw new Error('User already exists but not verified');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 12);
  
    // Create a new user (with isVerified set to false)
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'student',
      isVerified: false,
    });
  
    const savedUser = await newUser.save();
  
    // Create a verification token
    const verificationToken = new VerificationToken({
      userEmail: savedUser.email,
      token: crypto.randomBytes(32).toString('hex'),
    });
    await verificationToken.save();
  
    // Construct verification URL and send the verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken.token}`;
    sendVerificationEmail(email, verificationUrl);
  
    let studentInfoDoc = null;
    let studentRegDoc = null;

    // 2. If the user is a 'student', create StudentInfo and StudentRegistration docs
    if (newUser.role === 'student') {
      studentInfoDoc = new StudentInfo({
        code_module: data.code_module,
        code_presentation: data.code_presentation,
        user: newUser._id,
        gender: data.gender,
        imd_band: data.imd_band,
        highest_education: data.highest_education,
        age_band: data.age_band,
        region: data.region,
        disability: data.disability,
      });
      await studentInfoDoc.save();

      // 2b. Create StudentRegistration (if you want to track registration dates)
      studentRegDoc = new StudentRegistration({
        code_module: data.code_module,
        code_presentation: data.code_presentation,
        user: newUser._id,
        date_registration: new Date(data.date_registration),
      });
      await studentRegDoc.save();
    }

    return {
      success: true,
      user: newUser,
      studentInfo: studentInfoDoc,
      studentRegistration: studentRegDoc,
    };
  };
  

//verify a user by link
exports.verifyUserByLink = async (token) => {
    try {
      const verificationToken = await VerificationToken.findOne({ token });
      if (!verificationToken) {
        throw new Error('Invalid verification token');
      }
      if (verificationToken.expiresAt < Date.now()) {
        await exports.requestVerificationEmail(verificationToken.userEmail);
        throw new Error('Verification token expired & sent again');
      }
      const user = await User.findOneAndUpdate(
        { email: verificationToken.userEmail },
        { emailVerifiedAt: Date.now() }
      );
      if (!user) {
        throw new Error('User not found');
      }
      await VerificationToken.deleteOne({ token });
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

// login a user
exports.loginUser = async ({ email, password }) => {
    const userExists = await User.findOne({ email });

    if (!userExists) {
        throw new Error('Invalid Email'); // Throw error if the email is invalid
    }

    if (userExists && !userExists.emailVerifiedAt) {
        throw new Error('User not verified'); // Throw error if the user is not verified
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

    if (!isPasswordCorrect) {
        throw new Error('Invalid Password'); // Throw error if the password is invalid
    }

    const token = jwt.sign(
        { userId: userExists._id, name: userExists.name, role: userExists.role, email: userExists.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, user: { id: userExists._id, name: userExists.name, email: userExists.email, role: userExists.role } };
};

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