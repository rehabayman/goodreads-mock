const express =  require('express');
const router = express.Router();
// const CategoryModel = require('../models/categories')
const { authJwt } = require("../middlewares");
const categoryController = require("../controllers/categoryController");

const cors = require('cors');
console.log(authJwt.verifyToken)
exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}
router.get("/",  [authJwt.verifyToken], categoryController.getAllCategories);
router.post("/",  [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategory);
router.patch('/:id',[authJwt.verifyToken], categoryController.updateCategory);
router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], categoryController.deleteCategory);


// router.get('/',(req,res)=>{
//     CategoryModel.find({},(err,category)=>{
//         if(err)
//          return res.send(err); 
//         res.json(category); 
        
//     })
// });

router.get('/all', [authJwt.verifyToken],categoryController.getAll);
router.get('/:id/', [authJwt.verifyToken],categoryController.getDetails);



module.exports = router;
