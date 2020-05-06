const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const db = require("./models");
var bcrypt= require('bcryptjs')


const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

const app = express();

const Role = db.role;
const User = db.user

var corsOptions = {
  origin: "http://localhost:8081"
};

//  importig Home routes.
const homeRouter = require("./routes/home.js");

app.use(cors(corsOptions));

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// middleware that logs requests method and the url requested.
app.use( (req, res, next)=>{
  console.log(`\n\nnew request, its method: ${req.method}`);
  console.log(`the url requested: ${req.url}\n`);
  next();
})

app.get('/', (req, res) => {
  res.json({ message: "welcome" })
})

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
const {userRouter,tokenMiddleware}=require('./routes/users');

app.use(tokenMiddleware)
app.use('/api',userRouter)

app.use("/home", homeRouter);

app.listen(PORT, (err) => {

  if (!err) console.log(`App Started on port: ${PORT}`);

});


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

        else console.log("added 'admin' to roles collection");
      });
    }
  });

  
User.findOne({username:"admin"},(err,user)=>{
  
  if(!user){
    user = new User({
      username: "admin",
      firstName: "admin",
      lastName: "admin",
      password: bcrypt.hashSync("12345678",8),
      email: "admin@gmail.com"
    
    })
    Role.findOne({ name: "user" }, (err, role) => {
      if (err) {
        console.log(err)
        return
      }
      user.roles = [role._id]
    
    })
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