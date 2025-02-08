const { getUserByEmail } = require('../services/userService');
const { getAllUsers } = require('../services/userService');

// get user by Email
exports.getUserByEmail = async (req, res) => {
    try{
        const user = await getUserByEmail(req.params.email);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'User Not Found'});
        }
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

//get all users
exports.getAllUsers = async (req, res) => {
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}