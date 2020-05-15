const express= require('express')
const bookController = require('../controllers/bookController');
const router= express.Router()
const { authJwt } = require("../middlewares");
const cors = require('cors');
console.log(authJwt.verifyToken)
exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.get('/shelves', [authJwt.verifyToken], bookController.getBootShelves);
router.get("/",  [authJwt.verifyToken], bookController.allBooks);
router.post('/add', [authJwt.verifyToken, authJwt.isAdmin] ,bookController.addBook);
router.get("/:id", [authJwt.verifyToken] ,bookController.oneBook);
router.patch("/:id", [authJwt.verifyToken, authJwt.isAdmin], bookController.editBook);
router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], bookController.removeBook);


router.get('/rate/:id', [authJwt.verifyToken], bookController.getBookRating);

// router.options('/rate/:id', cors())
router.post('/rate/:id', [authJwt.verifyToken], bookController.updateBookRating);

router.post('/shelves/:id', [authJwt.verifyToken], bookController.updateBookShelf);

router.post("/addreview/:bookId/:userId", bookController.addreview);

module.exports = router