const mongoose = require('mongoose');

const userBookRatingSchema = new mongoose.Schema({
    rating: {
        type: Number, 
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model('BookRatings', userBookRatingSchema);