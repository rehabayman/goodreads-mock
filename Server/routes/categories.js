const express =  require('express');
const router = express.Router();
const CategoryModel = require('../models/categories')
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

router.get('/',[authJwt.verifyToken],(req,res)=>{
    CategoryModel.find({},(err,category)=>{
        if(err)
         return res.send(err); 
        res.json(category); 
        
    })
});

// router.get('/',(req,res)=>{
//     CategoryModel.find({},(err,category)=>{
//         if(err)
//          return res.send(err); 
//         res.json(category); 
        
//     })
// });

router.get('/all', categoryController.getAll);
router.get('/:id/', categoryController.getDetails);

router.post('/',[authJwt.verifyToken], (req,res)=>{
    let  {body : {name,id
        ,books,
         } }  = req;
    // const name =req;

    let category= new CategoryModel({
        name,id
        ,books,
     
    });
    var found = true;
    var i = 0;        
    // Do need to add if we not find it
    CategoryModel.find({}, function(err, categories) {
    let cat=categories.filter((cat)=> (cat.name===category.name)).map(filtered=> {return filtered.name;})
    if(cat!==category.name)
    {
        found = false;
        category.save((err,category)=>{
            if(err)
            {res.status(500).send({message: err});
        return ;} 
            res.send(category);
        });
    }

    if (found)
        res.status(404).send({message: "Category already exists."});})
       
    // res.status(204).end();
    // res.status(404).send({message: "Category already exists."});
});
router.patch('/:id',[authJwt.verifyToken],(req,res)=>{
   
    CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,category)=>{
        if(err)
        return res.send(err); 
        res.send(category);

    })
});
router.delete('/:id',[authJwt.verifyToken],(req,res)=>{
    CategoryModel.findByIdAndRemove({_id:req.params.id}, req.body, function(err, category) {
        if(err)
        return res.send(err); 
        res.send(category);

    })
});



module.exports = router;

