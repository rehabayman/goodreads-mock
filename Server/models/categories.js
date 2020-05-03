const mongoose = require('mongoose');
const Book = require('./books');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
});

// Set the category id of dependent documents to null
// To be invoked --> category.remove()
categorySchema.pre('remove', function () {
    Book.updateMany({category_id: this._id}, {category_id: null}).exec();
});

module.exports = mongoose.model('Category', categorySchema);