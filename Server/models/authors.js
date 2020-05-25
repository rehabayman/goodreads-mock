const mongoose = require('mongoose');
const Book = require('./books');
 
const authorSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minlength: 3},
    lastName: {type: String, required: true},
    birthdate: {type: Date, required: true},
    image_path: {type: String},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
});

// Delete dependent documents
// To be invoked --> author.remove()
authorSchema.pre('deleteOne', {document: true}, function (next) {
    Book.deleteMany({author: this._id}).then(next);
    next();
});

module.exports = mongoose.model('Author', authorSchema);