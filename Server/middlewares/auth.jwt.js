const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const db = require("../models")
const User = db.user
const Role = db.role
const BooksShelves = db.booksShelve
const BooksRating= db.booksRating

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
       
        return res.status(403).send({ message: "No Token Provided" })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.userId = decoded.id        
        next()
    })
}

isAdmin = (req, res, next) => {
    
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    console.log("hi")
                    res.status(500).send({ message: err })
                    return
                }
                var errorr = 0
                roles.forEach(role => {
                    if (role.name === "admin") {
                        errorr = 1
                        next()
                        return
                    }
                });

                res.end("{message: Require Admin Role}")
                return
            }

        )
    })
}

const authJwt = {
    verifyToken,
    isAdmin
}

module.exports = authJwt