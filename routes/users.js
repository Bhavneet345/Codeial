const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update)

router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

router.get('/sign-in', userController.signIn);

router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'}, 
), userController.createSession);

router.get('/sign-out', userController.destroySession);

// scope is information that we are wanting to fetch with a strategy google
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// through this is url at which we will recieve the data
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), userController.createSession);


module.exports = router;