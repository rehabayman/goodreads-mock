const bookModel = require("../models/books.js");
const bookRatings = require("../models/bookRatings");
const authorModel = require("../models/authors");
const categoryModel = require("../models/categories");
const homeCntroller = {};

homeCntroller.getPopular = (req, res) => {
    bookRatings.find({rating: {$gte: 3}}).populate([
        {
            path: "book",
            model: "Book",
            populate: {
                path: 'category',
                model: "Category"
            }
        }
    ]).populate([
        {
            path: "book",
            model: "Book",
            populate: {
                path: 'author',
                model: "Author"
            }
        }
    ]).sort({_id: "desc"}).limit(6).exec((err, data ) => {
        if(!err ){
            res.status(200).json(data);
        } else {
            res.status(200).json(err);
        }
        
    });
   
}

module.exports = homeCntroller;