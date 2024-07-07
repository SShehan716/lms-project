const { registerUser, loginUser, getUserByEmail } = require('../services/userService');

//register a new yser
exports.registerUser = async (req, res) => {
    try{
        const user = await registerUser(req.body);
        if(user){
            res.status(201).json({ message: 'User registered successfully'});
        }else{
            res.status(400).json({ message: 'User registration failed'});
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}


//login a user
exports.loginUser = async (req, res) => {
    try{
        const user = await loginUser(req.body);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(400).json({ message: 'User login failed'});
        }
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

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