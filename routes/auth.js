const express = require('express');
const router = express.Router();
const authController = require('./controller/auth.controller');

const User = require('../models/User');

router.post('/login/facebook', authController.findOrCreateUser, authController.createToken);
router.post('/logout', authController.logout);

router.get('/user', async (req, res, next) => {
  const user = await User.findOne({social_id : req.session.socialId});
  console.log(user);
  console.log(req.session);
  res.send({result : user});
})

module.exports = router;
