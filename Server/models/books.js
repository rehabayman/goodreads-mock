const mongoose = require('mongoose');
const BookShelves = require('./bookShelves');
const BookRatings = require('./bookRatings');
const BookReviews  =require('./bookReviews');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    image_path: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
});

// Delete dependent documents
// To be invoked --> book.remove()

bookSchema.pre('remove', function () {
    BookShelves.remove({book_id: this._id}).exec();
});

bookSchema.pre('remove', function() {
    BookRatings.remove({book_id: this._id}).exec();
});

bookSchema.pre('remove', function() {
    BookReviews.remove({book_id: this._id}).exec();
});

module.exports = mongoose.model('Book', bookSchema);