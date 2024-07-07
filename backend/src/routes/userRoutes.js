const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserByEmail } = require('../controllers/userController');

//public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

//protected routes
router.get('/user/:email', authMiddleware, getUserByEmail);

module.exports = router;