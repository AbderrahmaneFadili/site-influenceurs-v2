const { verifySignUp, authJWT } = require("../../middlewares");
const influencerController = require("../../controllers/influencer.controller");
const express = require("express");
const router = express.Router();

module.exports = (app) => {
  //use header middleware
  app.use((request, response, next) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST   /api/influencers/register
  router.post(
    "/register",
    [verifySignUp.checkDuplicateEmail],
    influencerController.register
  );

  //get /api/influencers/emailConfirmation
  router.get("/email-confirmation", influencerController.emailConfirmation);

  //post /api/influencers/signin
  router.post("/signin", influencerController.signIn);

  //post /api/influencers/
  router.post(
    "/validate-instagram-account",
    [authJWT.verifyToken],
    influencerController.validateInstagramAccount
  );
  //post /api/influencers
  router.post(
    "/complet-profile",
    [authJWT.verifyToken],
    influencerController.completProfile
  );

  app.use("/api/influencers", router);
};
