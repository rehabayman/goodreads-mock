const mongoose = require('mongoose');
const BookShelves = require('./bookShelves');
const BookRatings = require('./bookRatings');
const BookReviews = require('./bookReviews');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 3, unique: true },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        validate(value) {
            if (!validator.isAlpha(value))
                throw Error("First Name should be all Alphabetical Characters");
        }
    },
    lastName: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value))
                throw Error("Last Name should be all Alphabetical Characters");
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw Error("Invalid Email Format");
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    image_path: {
        type: String,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }]
});

userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return next("Cannot Add/Update User");
            } else {
                user.password = hash;
                next();
            }
        });
    });
});

// Delete dependent documents
// To be invoked --> user.remove()

userSchema.pre('remove', function () {
    BookShelves.remove({ user_id: this._id }).exec();
});

userSchema.pre('remove', function () {
    BookRatings.remove({ user_id: this._id }).exec();
});

userSchema.pre('remove', function () {
    BookReviews.remove({ user_id: this._id }).exec();
});

module.exports = mongoose.model('User', userSchema);