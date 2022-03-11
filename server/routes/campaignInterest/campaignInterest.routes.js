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

  //POST /api/campaignInterests/add
  router.post("/add", [authJWT.verifyToken], campaignInterestController.create);

  app.use("/api/campaigninterests", router);
};
