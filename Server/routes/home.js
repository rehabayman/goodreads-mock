const express= require('express')

const router= express.Router()
const homeCntroller = require("../controllers/homeController.js");
router.get("/popular", homeCntroller.getPopular);



module.exports = router