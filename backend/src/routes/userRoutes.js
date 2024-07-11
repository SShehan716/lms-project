const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserByEmail, verifyUserByLink, requestVerificationEmail } = require('../controllers/userController');

//public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:token', verifyUserByLink);
router.get('/verify-request/:email', requestVerificationEmail);

//protected routes
router.get('/user/:email', authMiddleware, getUserByEmail);

module.exports = router;