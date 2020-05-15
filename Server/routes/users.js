const express = require('express')
const userController = require('../controllers/userController');
const { authJwt } = require("../middlewares");

const router = express.Router()


exports.tokenMiddleware = function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
}

router.get("/test/all", userController.allAccess);

// router.get("/test/user", [authJwt.verifyToken], userController.userBoard);


router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
);

router.get(
    "/profile",
    [authJwt.verifyToken],
    userController.userProfile
);

exports.userRouter = router