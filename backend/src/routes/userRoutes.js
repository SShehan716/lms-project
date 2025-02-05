const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserByEmail } = require('../controllers/userController');
const { getAllUsers } = require('../controllers/userController');

//protected routes
router.get('/user/:email', authMiddleware, getUserByEmail);
router.get('/all-users', authMiddleware, getAllUsers);

module.exports = router;