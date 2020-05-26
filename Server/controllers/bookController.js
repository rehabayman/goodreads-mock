const { bookModel, bookRatingModel, authorModel, categoryModel, bookShelvesModel, bookReviews } = require("../models/index")
const fs = require('fs');

exports.getBookRating = (req, res) => {

    bookRatingModel.findOne({ book: req.params.id, user: req.userId }, (err, bookRating) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (bookRating) {
            res.status(200).send(bookRating);
        } else {
            res.status(404).send({ message: "User hasn't rated the book yet." });
        }
    });

}

exports.updateBookRating = (req, res) => {
    const { body: { rating } } = req;
    console.log(rating);
    console.log(req.userId);
    console.log(req.params.id);
    bookRatingModel.findOne({ book: req.params.id, user: req.userId }, (err, bookRating) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
        }

        if (bookRating) {
            bookRating.rating = rating;
            bookRating.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Rating updated Successfully");
                    // res.status(200).send(bookRating);
                }
            });
        } else {
            newBookRating = new bookRatingModel({
                user: req.userId,
                book: req.params.id,
                rating
            });
            newBookRating.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Rating added Successfully");
                    // res.status(200).send(bookRating);
                }
            });
            bookModel.findById(req.params.id, (e, bookInstance) => {
                if (e) {
                    console.log(e);
                    res.status(500).send({ message: e });
                    return;
                } else {
                    bookInstance.ratings.push(newBookRating._id);
                    bookInstance.save(error => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Rating added to book");
                            res.status(200).send(bookRating);
                        }
                    });
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
        res.status(404).send({ message: "Shelves Not Found" });
    }
}

exports.updateBookShelf = (req, res) => {
    const { body: { shelf } } = req;
    console.log(shelf);
    console.log(req.userId);
    console.log(req.params.id);
    bookShelvesModel.findOne({ book: req.params.id, user: req.userId }, (err, bookShelf) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: err });
            return;
        }

        if (bookShelf) {
            bookShelf.shelf = shelf;
            bookShelf.save(err => {
                if (err) {
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
                if (err) {
                    console.log(err);
                } else {
                    console.log("Shelf added Successfully");
                    res.status(200).send(bookShelf);
                }
            });
        }
    });
}

exports.addBook = (req, res, next) => {
    const { body: { name, author, category } } = req;

    const image_ext = req.files[0].originalname.split('.')[1];
    let image_path = req.files[0].filename + "." + image_ext;

    fs.rename(req.files[0].path, process.env.BOOKS_COVERS + image_path, (err) => {
        if (err) console.log(err);
    });

    console.log(name, category, image_path, author)
    const bookdata = new bookModel({
        name,
        image_path,
        author,
        category
    })
    authorModel.findById({ _id: author }, (error, author) => {
        if (error) return res.send(error);
        author.books.push(bookdata);
        author.save((error, author) => {
            if (error) return res.send(error);
        })
    });
    bookdata.save((err, book) => {
        if (err) next(err);
        else {
            bookModel.findById(book._id)
                .populate('author', 'firstName lastName')
                .populate('category', 'name')
                .exec((err, booke) => {
                    if (err) next('cannot find this book')
                    else res.json(booke)
                })
        }
    })
}

// exports.oneBook = (req, res, next) => {
//     bookModel.findById(req.params.id)
//     .populate('authors', 'firstname lastname')
//     .populate('categories', 'name')
//     .exec((err, book)=>{
//         if(err) next('cannot find this book');
//         res.json(book)
//     })
// }
exports.oneBook = (req, res, next) => {

    bookModel.findById(req.params.id)
        .populate('author', 'firstName lastName')
        .populate('category', 'name')
        .populate('ratings', 'rating user')
        .populate([{
            path: 'reviews',
            populate: {
                path: 'user',
                select: "username"
            },
        }])
        .exec((err, book) => {
            if (err) {
                next('cannot find this book')
                console.log(err)
            };

            bookShelvesModel.find({ book: req.params.id, user: req.userId }).select("shelf").exec((err, shelf) => {

                res.json({ book, shelf: shelf[0] })
            })
        })
}


exports.allBooks = (req, res, next) => {

    bookModel.find({})
        .populate('author', 'firstName lastName')
        .populate('category', 'name')
        .exec((err, book) => {
            if (err) res.status(404).send({ message: 'cannot find books' });
            console.log(book);
            res.json(book)
        })
};

exports.editBook = (req, res, next) => {
    let updatedInfo = { }; 
    const { body } = req;

    if(body.name) updatedInfo['name'] = body.name;
    if(body.author) updatedInfo['author'] = body.author;
    if(body.category) updatedInfo['category'] = body.category;

    if(req.files && req.files.length > 0) {
        const image_ext = req.files[0].originalname.split('.')[1];
        let image_path = req.files[0].filename+"."+image_ext;
        fs.rename(req.files[0].path, process.env.BOOKS_COVERS + image_path, (err) => {
            if(err) console.log(err);
        });
        updatedInfo['image_path'] = image_path;
    }

    bookModel.findByIdAndUpdate(req.params.id, updatedInfo,
        { new: true }
        , (err, book) => {
            if (err) next('cannot update the book');
            else {
                bookModel.findById(book._id)
                .populate('author', 'firstName lastName')
                .populate('category', 'name')
                .exec((err, booke) => {
                    if (err) next('cannot find this book')
                    else res.json(booke)
                })
            }
        })
}

exports.removeBook = (req, res, next) => {

    bookModel.findById(req.params.id, function (err, doc) {
        if (err) {
            next('cannot find the book');
        }
        doc.deleteOne(function(err, doc){
            if(err) console.log(err)
            else res.send(doc)
        })
    })
    // bookModel.findByIdAndRemove(req.params.id,
    //     (err) => {
    //         if (err) next('cannot find the book');
    //         res.send('success')
    //     })
}


exports.addreview = (req, res) => {
    const { userId, bookId } = req.params;
    const { review } = req.body;

    bookReviews.create({ review: review, book: bookId, user: userId }).then(result => {
        bookModel.find({ _id: bookId }).exec((err, book) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                book[0].reviews.push(result._id)
                book[0].save();
                res.send("done");
            }
        })

    }).catch(e => {
        console.log(e);
    });

}