const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define the home route
router.get('/', homeController.index);

// Define other test routes that will be validated
router.post('/login', (req, res) => {
    res.send('Login endpoint');
});

router.post('/signup', (req, res) => {
    res.send('Signup endpoint');
});

router.get('/profile', (req, res) => {
    res.send('Profile endpoint');
});

module.exports = router;
