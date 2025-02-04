const { registerUser, loginUser, verifyUserByLink, requestVerificationEmail} = require('../services/authService');

//register a new yser
exports.registerUser = async (req, res) => {
    try{
        const user = await registerUser(req.body);
        if(user){
            res.status(201).json({ message: 'User invited successfully'});
        }else{
            res.status(400).json({ message: 'User invite failed'});
        }
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

// Verify email
exports.verifyUserByLink = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await verifyUserByLink(token);

        if (user.message) {
            return res.status(400).json({ message: user.message });
        }

        res.status(200).json({ message: 'User Verified Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//login a user
exports.loginUser = async (req, res) => {
    try {
        const user = await loginUser(req.body); // Call the service layer

        res.status(200).json(user); // Send success response if login succeeds
    } catch (error) {
        // Handle specific error messages
        if (error.message === 'Invalid Email') {
            return res.status(404).json({ error: true, message: error.message });
        } else if (error.message === 'User not verified') {
            return res.status(403).json({ error: true, message: error.message });
        } else if (error.message === 'Invalid Password') {
            return res.status(401).json({ error: true, message: error.message });
        }

        // Handle unexpected errors
        res.status(500).json({ error: true, message: 'Server Error' });
    }
};

// request verification email again
exports.requestVerificationEmail = async (req, res) => {
    try{
        const user = await requestVerificationEmail(req.params.email);

        if(user){
            res.status(200).json({message: 'Verification email sent successfully'});
        }else{
            res.status(400).json({message: 'Verification email failed'});
        }
    }catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}