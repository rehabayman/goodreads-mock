const mongoose = require('mongoose');

const userBookShelvesSchema = new mongoose.Schema({
    shelf: {
        type: String, 
        required: true,
        enum: ['read', 'reading', 'want to read'],
    },
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model('BookShelves', userBookShelvesSchema);