const { registerUser, loginUser, verifyUserByLink, requestVerificationEmail} = require('../services/authService');

//register a new yser
exports.registerUser = async (req, res) => {
    try {
      console.log(req.body);
      const {
        name,
        email,
        password,
        role,
        code_module,
        code_presentation,
        date_registration,
        date_unregistration,
        gender,
        imd_band,
        highest_education,
        age_band,
        num_of_prev_attempts,
        studied_credits,
        region,
        disability,
        final_result,
      } = req.body;
      // Call the service function with request body
      await registerUser({
        name,
        email,
        password,
        role,
        code_module,
        code_presentation,
        date_registration,
        date_unregistration,
        gender,
        imd_band,
        highest_education,
        age_band,
        num_of_prev_attempts,
        studied_credits,
        region,
        disability,
        final_result,
      });
  
      // On success, send a response with a "message" key.
      return res.status(201).json({ message: "User invited successfully" });
    } catch (error) {
      // If the error message indicates a conflict (user exists or is not verified),
      // return a 409 response with an "error" key.
      if (
        error.message.includes("already exists") ||
        error.message.includes("not verified")
      ) {
        return res.status(409).json({ error: error.message });
      }
      // For all other errors, return a 400 response with an "error" key.
      return res.status(400).json({ error: error.message });
    }
  };

// Verify email
exports.verifyUserByLink = async (req, res) => {
    const { token } = req.params;
    const result = await verifyUserByLink(token);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: 'User Verified Successfully' });
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