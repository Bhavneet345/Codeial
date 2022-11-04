const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/friends_controller');

router.get('/addRemoveFriend', FriendshipController.addRemoveFriend);

module.exports = router;


