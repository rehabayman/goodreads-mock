const express= require('express')
const bookController = require('../controllers/bookController');
const router= express.Router()
const { authJwt } = require("../middlewares");
const multer = require('multer');
const path = require('path');

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.get('/shelves', [authJwt.verifyToken], bookController.getBootShelves);
router.get(["/","/all"],  [authJwt.verifyToken], bookController.allBooks);

const upload = multer({
    dest: path.resolve('../Server/public/upload/books'),
    limits: { fileSize: 2000000, files: 1 }, // 2M File
});
router.post('/add', upload.array('image_path', 1), [authJwt.verifyToken, authJwt.isAdmin] ,bookController.addBook);
router.get("/:id", [authJwt.verifyToken] ,bookController.oneBook);
router.patch("/:id",upload.array('image_path', 1), [authJwt.verifyToken, authJwt.isAdmin], bookController.editBook);
router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], bookController.removeBook);


router.get('/rate/:id', [authJwt.verifyToken], bookController.getBookRating);

// router.options('/rate/:id', cors())
router.post('/rate/:id', [authJwt.verifyToken], bookController.updateBookRating);

router.post('/shelves/:id', [authJwt.verifyToken], bookController.updateBookShelf);

router.post("/addreview/:bookId/:userId", [authJwt.verifyToken], bookController.addreview);

module.exports = router