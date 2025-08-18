const express = require('express');
const { authUser } = require('../middlewares/userAuthMiddleware');
const userAuthController = require('../controllers/userAuthController');

const router = express.Router();

router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);
router.get('/profile', authUser, userAuthController.userProfile);
router.get('/logout', userAuthController.logoutUser);

module.exports = router;
