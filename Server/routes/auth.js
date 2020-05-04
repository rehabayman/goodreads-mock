const {verifySignUp} = require("../middlewares")
const controller = require("../controllers/auth")
const multer = require('multer');
const path = require('path');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const upload = multer({
    dest: path.resolve('../Server/public/upload/users'),
    limits: { fileSize: 2000000, files: 1 }, // 2M File
  });

  app.post(
    "/users/auth/signup",
        upload.array('image', 1),
        verifySignUp.checkDuplicatedUsernameOrEmail,        
        controller.signup
  );

   app.post("/users/auth/signin", controller.signin);
};

