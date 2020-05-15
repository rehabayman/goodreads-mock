const config = require("../config/auth")
const db = require("../models/index")

const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const fs = require('fs');

exports.signup = (req, res) => {
    const { body: { username, firstName, lastName, email, password } } = req;
    // console.log(req.files[0].path);
    
    const image_ext = req.files[0].originalname.split('.')[1];
    // let image_path = req.files[0].path+"."+image_ext;
    let image_path = req.files[0].filename+"."+image_ext;
    
    fs.rename(req.files[0].path, process.env.USER_PICTURES+image_path, (err) => {
        if(err) console.log(err);
    })

    let newUser = new User({
        username,
        firstName,
        lastName,
        email,
        password,
        image_path
    });
    Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        newUser.roles = [role._id];
    });
    newUser.save().then(() => {
        res.status(201).send({newUser, message: "You Registered Successfully"});
    }).catch((err) => {
        res.status(400).send({message: err});
    });

}

exports.signin = (req, res) => {
console.log(req.body)
    User.findOne({
        username: req.body.username
    }).populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not Found" })
            }

            //check password matching
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "invalid password"
                })
            }
            // assign the three parts ot the token
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            })

            //get authorities of user and send it to the client
            let authorities = []
            user.roles.forEach(role => {
                authorities.push("ROLE_" + role.name.toUpperCase())
            });

            //send the  token and user data to the client
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
}