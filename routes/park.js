const express = require('express');
const router = express.Router();
const parkController = require('./controller/park.controller');
const Park = require('../models/Park');
const { verifyToken } = require('../routes/controller/auth.controller');
const {
  uploadImage,
  sendFileLocation,
  saveExchangeData,
  searchParkList,
  deleteImage,
  deleteOrderList,
  changeExchangeStatus,
  changePointAndAddHistory
} = require('../routes/controller/park.controller');

const User = require('../models/User');

router.get('/', async (req, res, next) => {
  const parkList = await Park.find({});
  res.send({ parkList: parkList, result: 'ok' });
});

router.post('/seats/upload',verifyToken,uploadImage.single('file'),sendFileLocation);

router.post('/seats', verifyToken, saveExchangeData);

router.post('/seats/point', verifyToken, changePointAndAddHistory)

router.post('/seats/:id', verifyToken, changeExchangeStatus);

router.get('/seats/:id', verifyToken, searchParkList);

router.delete('/seats/:id', verifyToken, deleteImage, deleteOrderList);


module.exports = router;
