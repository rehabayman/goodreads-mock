const config = require("../config/auth")
const db = require("../models/index")

const User = db.user
const Role = db.role

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {

}

exports.signin = (req, res) => {

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