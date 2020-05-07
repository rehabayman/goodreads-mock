const express= require('express')
const { authJwt } = require("../middlewares");
const bookController = require('../controllers/bookController');
const cors = require('cors');

const router= express.Router();

router.get('/rate/:id', [authJwt.verifyToken], bookController.getBookRating);

// router.options('/rate/:id', cors())
router.post('/rate/:id', [authJwt.verifyToken], bookController.updateBookRating);

router.post('/shelves/:id', [authJwt.verifyToken], bookController.updateBookShelf);
router.get('/shelves', [authJwt.verifyToken], bookController.getBootShelves);

module.exports = router