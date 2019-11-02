const express = require('express');
const router = express.Router();
const parkController = require('./controller/park.controller');
const Park = require('../models/Park');

router.get('/', async (req, res, next)=>{
  const parkList = await Park.find({});
  res.send({parkList : parkList,result:"ok"});
});

module.exports = router;
