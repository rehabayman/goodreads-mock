const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./role");

db.ROLES = ["user", "admin"];

module.exports = db;