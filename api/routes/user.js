const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.post("/signup", UserController.signup_user);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.delete_user);


module.exports = router;