const express= require('express')
const booksController = require('../controllers/booksController');
const router= express.Router()
const { authJwt } = require("../middlewares");

exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.get("/",  [authJwt.verifyToken, authJwt.isAdmin], booksController.allBooks);
router.post('/add', [authJwt.verifyToken, authJwt.isAdmin] ,booksController.addBook);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin] ,booksController.oneBook);
router.patch("/:id", [authJwt.verifyToken, authJwt.isAdmin], booksController.editBook);
router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], booksController.removeBook);



module.exports= router