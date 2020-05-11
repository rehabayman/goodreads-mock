const CategoryModel = require('../models/categories');
const bookModel = require("../models/books.js");
// const authorModel = require("../models/authors.js");
const categoryController = {}

categoryController.getAll = (req, res) =>{

    CategoryModel.find({}).exec((err, categories)=>{
        if(!err){
            res.send(categories);
        } else{
            res.send(err);
        }
    });
}


categoryController.getDetails = async (req, res) =>{
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

module.exports = categoryController;