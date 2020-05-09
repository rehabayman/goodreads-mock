const bookModel = require("../models/books.js");
const bookRatings = require("../models/bookRatings");
const authorModel = require("../models/authors");
const categoryModel = require("../models/categories");
const db = require("../models/index")
const User = db.user
const BooksShelves = db.booksShelve
const BooksRating = db.booksRating

const homeController = {};

homeController.getPopular = (req, res) => {
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
homeController.getUserBooks = (req, res) => {

    User.findById(req.userId).exec(function (err, user) {

        if (err) return handleError(err)
        let userBooks = []

        BooksShelves.find({ user }).populate([{
            path: 'book',
            populate: {
                path: 'author ratings'                           
            },
        }]).exec(function (err, booksShelves) {
            if (err) console.log(err)
            console.log(booksShelves)
            userBooks[0]=[]
            userBooks[0] = booksShelves


            var ids = booksShelves.map(function (bookShelv) { return bookShelv.book._id; });

            ids.forEach((id) => {

                BooksRating.aggregate([
                    { $match: { book: id } },
                    { $group: { _id: "$book", averageRatings: { $avg: '$rating' } } }
                ], function (err, result) {
                    if (err) console.log(err)
                    userBooks[1]=[]
                    userBooks[1].push(result[0])



                    // userBooks.forEach((userBook) => {


                    //     userBooksAverageRates.forEach((average) => {

                    //         console.log("hereee")
                    //         console.log(userBook.book._id)
                    //         console.log(average._id)
                    //         console.log(userBook.book._id == average._id)
                    //         console.log(userBook.book._id)
                    //         console.log( average._id)


                    //         if (userBook.book._id == average._id) {

                    //             console.log("hereeeeeeeeeeeee")
                    //             userBook["average"] = average.averageRatings
                    //         }
                    //     })
                    // })
                    // console.log(userBooks)
                    
                    
                    
                }
                );
            })
            
            res.json(userBooks)




        })
    })
}

module.exports = homeController;