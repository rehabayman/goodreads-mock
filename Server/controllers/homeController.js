const bookModel = require("../models/books.js");
const bookRatings = require("../models/bookRatings");
const authorModel = require("../models/authors");
const categoryModel = require("../models/categories");
const db = require("../models/index")
const User = db.user
const BooksShelves = db.booksShelve
const BooksRating = db.booksRating



exports.getPopular = (req, res) => {
    bookRatings.find({ rating: { $gte: 3 } }).populate([
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
    ]).sort({ _id: "desc" }).limit(6).exec((err, data) => {
        if (!err) {
            res.status(200).json(data);
        } else {
            res.status(200).json(err);
        }

    });

}


exports.getUserBooks = (req, res) => {

    User.findById(req.userId).exec(function (err, user) {

        if (err) next(" can not find user")
        let userBooks = []

        BooksShelves.find({ user }).populate([{
            path: 'book',
            populate: {
                path: 'author ratings'                           
            },
        }]).exec(function (err, booksShelves) {
            if (err) next("No Books for user")
           
            userBooks[0]=[]
            userBooks[0] = booksShelves
            
            res.json(userBooks)




        })
    })
}

