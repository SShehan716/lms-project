const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUserByLink, requestVerificationEmail } = require('../controllers/authController');

//public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyUserByLink);
router.get('/verify-request/:email', requestVerificationEmail);

module.exports = router;