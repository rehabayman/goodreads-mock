const express =  require('express');
const router = express.Router();
const AuthorsModel = require('../models/authors');


// router.get('/',(req,res)=>{
//     AuthorsModel.find({},(err,authors)=>{
//         if(err) return res.send(err);
//         res.json(authors);
//     })
// });
router.get('/',async(req,res)=>{
    const { page = 1, limit = 1 } = req.query;
    try{
        const authors = await AuthorsModel.find()
        .populate('books') 
        .limit(limit * 1)  
        .skip((page - 1) * limit)
        .exec();
        const count = await AuthorsModel.countDocuments();
        res.json({
            authors,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
    }catch(err){
        console.error(err.message);
    }
});
router.get('/:id',(req,res)=>{
    AuthorsModel.findOne({_id : req.params.id},(error,author)=>{
        if(error) return res.send(error);
        res.json(author);
    }).populate('books')
});
router.post('/',(req,res)=>{
    const {body : {firstName,lastName,birthdate,image_path}} = req;
    const author = new AuthorsModel({
        firstName,
        lastName,
        birthdate,
        image_path
    })
    author.save((err,author)=>{
        if(err) return res.send(err);
        res.json(author);
    })
});
router.patch('/:id',(req,res)=>{
    AuthorsModel.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,author)=>{
        if(err) return res.send(err);
        res.json(author);
    })
});
router.delete('/:id',(req,res)=>{
    AuthorsModel.findByIdAndRemove({_id:req.params.id},req.body,(err,author)=>{
        if(err) return res.send(err);
        res.json(author);
    })
});
module.exports = router;