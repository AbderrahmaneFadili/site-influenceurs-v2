const { verifySignUp, authJWT } = require("../../middlewares");
const authController = require("../../controllers/auth.controller");
const router = require("express").Router();

module.exports = (app) => {
  //use header middleware
  app.use((request, response, next) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST : api/auth/signup
  router.post(
    "/signup",
    [verifySignUp.checkDuplicateEmail],
    authController.signup
  );

  //POST : api/auth/signin
  router.post("/signin", authController.signin);

  //use the router
  app.use("/api/auth", router);
};
