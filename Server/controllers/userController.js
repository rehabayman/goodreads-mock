const userModel = require('../models/users');

exports.create = (req, res) => {
    const { body: { username, firstName, lastName, email, password } } = req;
    // const image_path = req.files.image.path;
    const newUser = new userModel({
        username,
        firstName,
        lastName,
        email,
        password,
        // image_path
    });
    newUser.save().then(() => {
        res.status(201).send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
