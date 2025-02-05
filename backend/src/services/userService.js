const User = require('../models/User');
const crypto = require('crypto');

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

// get all users
exports.getAllUsers = async () => {
    try{
        const users = await User.find().select('-password');
        return users;
    }catch(error){
        return { message: error.message };
    }
}