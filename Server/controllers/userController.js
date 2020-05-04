const userModel = require('../models/users');

function create (req, res) {
    const {body: {firstName, lastName, email, password}} = req;
    const image_path = req.files.image.path;
    const newUser = new userModel({
        firstName, 
        lastName, 
        email,
        password,
        image_path
    });
    newUser.save().then(() => {
        res.status(201).send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

module.exports = {
    create,
}