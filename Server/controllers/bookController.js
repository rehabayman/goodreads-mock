const {bookModel, bookRatingModel, authorModel, categoryModel, bookShelvesModel} = require("../models/index")

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

exports.getBootShelves = (req, res) => {
    let tmp = new bookShelvesModel();
    let bookShelves = tmp.schema.path('shelf').enumValues;
    if (bookShelves.length) {
        res.status(200).send(bookShelves);
    } else {
        res.status(404).send({message: "Shelves Not Found"});
    }
}

exports.updateBookShelf = (req, res) => {
    const {body: {shelf}} = req;
    console.log(shelf);
    console.log(req.userId);
    console.log(req.params.id);
    bookShelvesModel.findOne({book: req.params.id, user: req.userId}, (err, bookShelf) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
            return;
        }
        
        if (bookShelf) {
            bookShelf.shelf = shelf;
            bookShelf.save(err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Shelf updated Successfully");
                    res.status(200).send(bookShelf);
                }
            })
        } else {
            newBookShelf = new bookShelvesModel({
                user: req.userId,
                book: req.params.id,
                shelf
            });
            newBookShelf.save(err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Shelf added Successfully");
                    res.status(200).send(bookShelf);
                }
            });
        }
    });
}