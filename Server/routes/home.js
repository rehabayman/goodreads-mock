const express= require('express')

const router= express.Router()
const {getPopular, getUserBooks} = require("../controllers/homeController.js");
const { authJwt } = require("../middlewares");




router.get("/popular", getPopular);
router.get("/userbooks",authJwt.verifyToken,getUserBooks);



module.exports = router