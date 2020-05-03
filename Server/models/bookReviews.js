const mongoose = require('mongoose');

const userBookReviewSchema = new mongoose.Schema({
    review: { type: String, required: true },
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model('BookReviews', userBookReviewSchema);