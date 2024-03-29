const express = require('express');
const router = express.Router();

console.log('router loaded');

const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/about', require('./about'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));
router.use('/likes', require('./likes'));
router.use('/friends', require('./friend'));

module.exports = router;