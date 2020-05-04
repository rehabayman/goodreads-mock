const express= require('express')
const userController = require('../controllers/userController');
const multer = require('multer');

const router= express.Router()

const uploading = multer({
    dest: __dirname + '../public/uploads/users',
    limits: {fileSize: 2000000, files:1}, // 2M File
});

router.post('/', uploading, function(req, res) {
    userController.create(req, res);
});



module.exports= router