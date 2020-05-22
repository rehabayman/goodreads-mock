const mongoose = require('mongoose');
const BookShelves = require('./bookShelves');
const BookRatings = require('./bookRatings');
const BookReviews  =require('./bookReviews');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    image_path: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    ratings:[{type: mongoose.Schema.Types.ObjectId, ref: 'BookRatings'}],
    reviews:[{type: mongoose.Schema.Types.ObjectId, ref:'BookReviews'}]
});

// Delete dependent documents
// To be invoked --> book.deleteOne()

bookSchema.pre("deleteOne", { document: true }, function(next) {    
    BookShelves.deleteMany({ book: this._id }).then(next)
    BookRatings.deleteMany({book: this._id}).then(next);
    BookReviews.deleteMany({book: this._id}).then(next);    
    next()
  });

module.exports = mongoose.model('Book', bookSchema);