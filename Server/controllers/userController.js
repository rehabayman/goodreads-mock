const { user } = require('../models/index')

// FOR TESTING AUTHORIZATION
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.userProfile =  (req, res) => {
    user.findOne({_id: req.userId}, (err, user) => {
        if(err) {
            res.status(500).send("Error Happend while Retrieving User");
        }

        if(user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User Info Not Found");
        }
    });
};