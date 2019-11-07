const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Seat = require('../../models/Seat');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2'
});

const s3 = new aws.S3();

exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nkhvc',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

exports.deleteImage = async (req, res, next) => {
  const data = await Seat.find()
    .where('park')
    .equals(req.body.park)
    .where('seller')
    .equals(req.params.id);
  const urlKey = await data[0].image_url.split('/').pop();

  s3.deleteObject(
    {
      Bucket: 'nkhvc',
      Key: urlKey
    },
    function(err, data) {
      console.log(err);
      console.log(data);
    }
  );
  next();
};

exports.deleteOrderList = async (req, res, next) => {
  const result = await Seat.remove()
    .where('park')
    .equals(req.body.park)
    .where('seller')
    .equals(req.params.id);
  res.send({ result: result });
};

exports.sendFileLocation = (req, res, next) => {
  res.send({ imageUrl: req.file.location });
};

exports.saveExchangeData = async (req, res, next) => {
  const newExchange = new Seat(req.body.data);
  newExchange.save();
  console.log(req.body.data);
  res.send({ result: req.body.data });
};

exports.searchParkList = async (req, res, next) => {
  const parkList = await Seat.find()
    .where('park')
    .equals(req.params.id)
    .where('complete')
    .equals(false);
  res.send({ result: 'ok', parkList: parkList });
};
