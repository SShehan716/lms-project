const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserByEmail } = require('../controllers/userController');

//protected routes
router.get('/user/:email', authMiddleware, getUserByEmail);

module.exports = router;