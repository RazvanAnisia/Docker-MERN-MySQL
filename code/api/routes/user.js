const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');

router
  .route('/')
  .get(UserController.getUserDetails)
  .put(UserController.updateUserDetails);

router.route('/stats').get(UserController.getUserStats);
router.route('/unregister').post(UserController.deleteUserAccount);

module.exports = router;
