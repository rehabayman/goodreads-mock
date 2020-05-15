const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const db = require("./models");
const bcrypt = require('bcryptjs');
const bookRouter = require('./routes/books');
const authorRouter = require('./routes/authors');
const homeRouter = require("./routes/home.js");
const { authJwt } = require("./middlewares");

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;
// const userRouter = require('./routes/users');
const categoryRouter = require('./routes/categories.js');

const app = express();

const Role = db.role;
const User = db.user;
const BooksRatings = db.booksRating;
const Book = db.book


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(express.json());//middleware
app.use(cors());//middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// middleware that logs requests method and the url requested.
app.use((req, res, next) => {
  console.log(`\n\nnew request, its method: ${req.method}`);
  console.log(`the url requested: ${req.url}\n`);
  next();
})

app.get('/', (req, res) => {
  
  res.json({ message: "welcome" })
})



// Database Connection
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/goodReadsDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log("Started connection to mongo");
    initial();
  }
  else console.log(err);
});

require("./routes/auth")(app);
const { userRouter, tokenMiddleware } = require('./routes/users');

app.use(tokenMiddleware)
// app.use('/api', userRouter) // FOR TESTING ONLY
app.use('/categories',categoryRouter)
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use("/home", homeRouter);
app.use('/authors',authorRouter);
app.listen(PORT, (err) => {

  if (!err) console.log(`App Started on port: ${PORT}`);

});

// Creates the Roles and the Admin
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      var userRole = new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        else console.log("added 'user' to roles collection");
      });

      var adminRole = new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        else {
          console.log("added 'admin' to roles collection");

          User.findOne({ username: "admin" }, (err, user) => {

            if (!user) {
              user = new User({
                username: "admin",
                firstName: "admin",
                lastName: "admin",
                password: "12345678",
                email: "admin@gmail.com"
              });
              Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                  console.log(err)
                  return
                }
                user.roles = [role._id]
              });
              Role.findOne({ name: "admin" }, (err, role) => {

                if (err) {
                  console.log(err)
                  return
                }
                user.roles = [role._id]
                user.save(err => {
                  if (err) {
                    console.log(err)
                    return
                  }
                  console.log("User was registered successfully!");
                })
              })
            }
          })
        }
      });
    }
  });


}

// Error Middleware
app.use((err, req, res, next) => {
  if (err) res.status(500).send("Internal Server Error.");
});

