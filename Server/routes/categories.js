const express =  require('express');
const router = express.Router();
const CategoryModel = require('../models/categories')

router.get('/',(req,res)=>{
    CategoryModel.find({},(err,category)=>{
        if(err)
        return res.send(err); 
        res.json(category); 
        
    })
});

router.post('/', (req,res)=>{
    let  {body : {name,id
    //     books,
         } }  = req;
    // const name =req;

    let category= new CategoryModel({
        name,id
        // books,
     
    })
  
    category.save((err,category)=>{
        if(err)
        return res.send(err); 
        res.send(category);
    })
        // console.log('NEw message sfter',body.content);

    // res.status(204).end();
});
router.patch('/:id',(req,res)=>{
   
    CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,category)=>{
        if(err)
        return res.send(err); 
        res.send(category);

    })
});
router.delete('/:id',(req,res)=>{
    CategoryModel.findByIdAndRemove({_id:req.params.id}, req.body, function(err, category) {
        if(err)
        return res.send(err); 
        res.send(category);

    })
});



module.exports = router;


