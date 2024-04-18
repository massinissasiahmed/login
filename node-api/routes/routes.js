const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticate = require('../middleware/authMiddleware.js');

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Example of a protected route
router.get('/protected', authenticate, (req, res) => {
    res.send('Hello, you have accessed a protected route!');
});

module.exports = router;
