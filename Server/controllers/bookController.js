const {bookModel, bookRatingModel, authorModel, categoryModel} = require("../models/index")

exports.getBookRating = (req, res) => {
    
    bookRatingModel.findOne({book: req.params.id, user: req.userId}, (err, bookRating) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        
        if (bookRating) {
            res.status(200).send(bookRating);
        } else {
            res.status(404).send({message: "User hasn't rated the book yet."});
        }
    });
    
}

exports.updateBookRating = (req, res) => {
    const {body: {rating}} = req;
    console.log(rating);
    console.log(req.userId);
    console.log(req.params.id);
    bookRatingModel.findOne({book: req.params.id, user: req.userId}, (err, bookRating) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
            return;
        }
        
        if (bookRating) {
            bookRating.rating = rating;
            bookRating.save(err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Rating updated Successfully");
                    res.status(200).send(bookRating);
                }
            })
        } else {
            newBookRating = new bookRatingModel({
                user: req.userId,
                book: req.params.id,
                rating
            });
            newBookRating.save(err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Rating added Successfully");
                    res.status(200).send(bookRating);
                }
            });
        }
    });
}