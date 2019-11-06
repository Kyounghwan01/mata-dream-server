const express = require('express');
const router = express.Router();
const parkController = require('./controller/park.controller');
const Park = require('../models/Park');
const {verifyToken} = require('../routes/controller/auth.controller');
const {uploadImage, sendFileLocation, saveExchangeData, searchParkList} = require('../routes/controller/park.controller');

const Seat = require('../models/Seat');

router.get('/', async (req, res, next)=>{
  const parkList = await Park.find({});
  res.send({parkList : parkList,result:"ok"});
});

router.post('/seats/upload', verifyToken, uploadImage.single('file'), sendFileLocation)
router.post('/seats', verifyToken, saveExchangeData);

router.get('/seats/:id', verifyToken, searchParkList);

module.exports = router;
