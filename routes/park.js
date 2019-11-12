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
  changeExchangeStatus
} = require('../routes/controller/park.controller');

const Seat = require('../models/Seat');
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  const parkList = await Park.find({});
  res.send({ parkList: parkList, result: 'ok' });
});

router.post(
  '/seats/upload',
  verifyToken,
  uploadImage.single('file'),
  sendFileLocation
);
router.post('/seats', verifyToken, saveExchangeData);

router.post('/seats/point', verifyToken, async (req, res, next) => {
  const seller = await User.findOne().where('_id').equals(req.body.exchangeData.seller);
  const buyer = await User.findOne().where('_id').equals(req.body.exchangeData.buyer);
  seller.point += req.body.exchangeData.point;
  buyer.point -= req.body.exchangeData.point;
  seller.exchange_history.push(req.body.exchangeData);
  buyer.exchange_history.push(req.body.exchangeData);
  seller.save();
  buyer.save();
  res.send({result : 'ok'});
})

router.post('/seats/:id', verifyToken, changeExchangeStatus);

router.get('/seats/:id', verifyToken, searchParkList);

router.delete('/seats/:id', verifyToken, deleteImage, deleteOrderList);


module.exports = router;
