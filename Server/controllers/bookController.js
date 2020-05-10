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
                if(err) {
                    console.log(err);
                } else {
                    console.log("Rating added Successfully");
                    // res.status(200).send(bookRating);
                }
            });
            bookModel.findById(req.params.id, (e, bookInstance) => {
                if (e) {
                    console.log(e);
                    res.status(500).send({message: e});
                    return;
                } else {
                    bookInstance.ratings.push(bookRating._id);
                    bookInstance.save(error => {
                        if(error) {
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

exports.addBook = (req, res , next) => {
    const { body: { name, image_path , author, category } } = req;
       const bookdata = new bookModel({
           name,
           image_path,
           author,
           category
       })
       bookdata.save((err, book )=>{
           if(err) next(err);
           res.json(book)
       })
   }

exports.oneBook = (req, res, next) => {
    bookModel.findById(req.params.id)
    .populate('authors', 'firstname lastname')
    .populate('categories', 'name')
    .exec((err, book)=>{
        if(err) next('cannot find this book');
        res.json(book)
    })
}

exports.allBooks = (req, res, next) => {
    bookModel.find({ })
    .populate('author', 'firstName lastName')
    .populate('category', 'name')
    .exec((err, book)=>{
        if(err) res.status(404).send({message: 'cannot find books'});
        res.json(book)
    })
};

exports.editBook = (req, res, next) => {
    const { body: { name,
        image_path,
        author,
        category } } = req; 
    bookModel.findByIdAndUpdate(req.params.id,{
        name,
        image_path,
        author,
        category
    },
    {new: true}
    ,(err,book)=>{
        if(err) next('cannot update the book');
        res.json(book)
    })
}

exports.removeBook = (req, res, next) => {
    bookModel.findByIdAndRemove(req.params.id,
    (err)=>{
        if(err) next('cannot find the book');
        res.send('success')
    })
}
