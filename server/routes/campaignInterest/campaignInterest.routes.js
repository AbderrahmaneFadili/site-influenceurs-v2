const { verifySignUp, authJWT } = require("../../middlewares");
const campaignInterestController = require("../../controllers/campaignInterests.controller");
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

  //get all campaign interests by

  app.use("/api/campaigninterests", router);
};
