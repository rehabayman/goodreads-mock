const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./role");
db.author= require("./authors")
db.categories  = require("./categories")
db.book= require("./books")
db.booksRating= require("./bookRatings")
db.booksShelve= require("./bookShelves")
db.bookModel = require("./books");
db.bookRatingModel = require("./bookRatings");
db.authorModel = require("./authors");
db.categoryModel = require("../models/categories");
db.bookShelvesModel = require("../models/bookShelves");
db.bookReviews=require("../models/bookReviews")
db.ROLES = ["user", "admin"];

module.exports = db;