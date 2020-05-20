// const CategoryModel = require('../models/categories');
// const bookModel = require("../models/books.js");
// const authorModel = require("../models/authors.js");
const {bookModel, bookRatingModel, authorModel, categoryModel, bookShelvesModel, bookReviews} = require("../models/index")


exports.getAllCategories=(req,res)=>{
    categoryModel.find({}).populate('books').exec((err,category)=>{
        if(err)
         return res.send(err); 
        res.json(category); 
        
    })
};
exports.addCategory=(req,res)=>{
    let  {body : {name
        ,books,
         } }  = req;
    // const name =req;

    let category= new categoryModel({
        name
        ,books,
     
    });
 
        category.save((err,category)=>{
            if(err)
            {res.status(500).send({message: err});
        return ;} 
            res.send(category);
        });

        // res.status(404).send({message: "Category already exists."});})
};
exports.updateCategory=(req,res)=>{
   
    categoryModel.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,category)=>{
        if(err)
        return res.send(err); 
        res.send(category);

    })
};
exports.deleteCategory=(req,res)=>{
    categoryModel.findByIdAndRemove({_id:req.params.id}, req.body, function(err, category) {
        if(err)
        return res.send(err); 
        res.send(category);

    })
};

// const categoryController = {}

exports.getAll = (req, res) =>{

    categoryModel.find({}).exec((err, categories)=>{
        if(!err){
            res.send(categories);
        } else{
            res.send(err);
        }
    });
}


exports.getDetails = async (req, res) =>{
    try {
        let books = await bookModel.find({category: req.params.id})
        .populate("category").populate("author")
        .sort({name:'asc'})
        .exec();
        let docs = await bookModel.countDocuments({category: req.params.id}).exec();
        res.send([books, docs]);
    } catch ( err ){
        console.log(err);
        res.send(err);
    }

};

// module.exports = categoryController;