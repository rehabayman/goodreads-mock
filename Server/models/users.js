const mongoose = require('mongoose');
const BookShelves = require('./bookShelves');
const BookRatings = require('./bookRatings');
const BookReviews  =require('./bookReviews');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3, unique:true},
    firstName: {type: String, required: true, minlength: 3},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: /.+@.+\..+/},
    password: {type: String, required: true},
    image_path: {type: String},
    roles:[{type:mongoose.Schema.Types.ObjectId, ref:"Role"}]
});

// Delete dependent documents
// To be invoked --> user.remove()

userSchema.pre('remove', function () {
    BookShelves.remove({user_id: this._id}).exec();
});

userSchema.pre('remove', function () {
    BookRatings.remove({user_id: this._id}).exec();
});

userSchema.pre('remove', function () {
    BookReviews.remove({user_id: this._id}).exec();
});

module.exports = mongoose.model('User', userSchema);