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

exports.sendFileLocation = (req, res, next) => {
  res.send({ imageUrl: req.file.location });
};

exports.saveExchangeData = async (req, res, next) => {
  const newExchange = new Seat(req.body.data);
  Seat.save();
  console.log(req.body.data);
  res.send({ result: req.body.data });
};
