const express =  require('express');
const router = express.Router();
// const AuthorsModel = require('../models/authors');
const { authJwt } = require("../middlewares");
const authorController = require("../controllers/authorController");
const cors = require('cors');
const path = require('path');
const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/authors-pics/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

const DIR = './public/upload/authors/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,'image'+ '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
            console.log(file);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.get("",  [authJwt.verifyToken], authorController.getAllAuthors);
router.post("",  upload.single('image_path'), [authJwt.verifyToken, authJwt.isAdmin], authorController.addAuthor);
router.patch('/:id',upload.single('image_path'),[authJwt.verifyToken, authJwt.isAdmin], authorController.updateAuthor);
router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], authorController.deleteAuthor);
router.get('/:id/', [authJwt.verifyToken],authorController.authorGetDetails);
// router.get('/:id/',authorController.authorGetDetails);


module.exports = router;