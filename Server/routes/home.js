const express= require('express')

const router= express.Router()
const homeController = require("../controllers/homeController.js");
const { authJwt } = require("../middlewares");




router.get("/popular", homeController.getPopular);
router.get("/userbooks",authJwt.verifyToken, homeController.getUserBooks);



module.exports = router