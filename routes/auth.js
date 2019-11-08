const express = require('express');
const router = express.Router();
const authController = require('./controller/auth.controller');

const User = require('../models/User');

router.post('/login/facebook', authController.findOrCreateUser, authController.createToken);
router.post('/logout', authController.logout);

router.get('/user', authController.verifyToken, async (req, res, next) => {
  const user = await User.findOne({social_id : req.session.socialId});
  res.send({result : user});
})

router.get('/seller/:id', authController.verifyToken, async (req, res, next) => {
  const seller = await User.findOne().where('_id').equals(req.params.id);
  res.send({result : seller});
})

module.exports = router;
