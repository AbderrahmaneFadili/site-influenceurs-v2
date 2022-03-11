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

  //GET /api/campaignInterest/find/:id
  router.get(
    "/find/:id",
    [authJWT.verifyToken],
    campaignInterestController.find
  );

  //DELETE /api/campaignInterest/delete/:id
  router.delete(
    "/delete/:id",
    [authJWT.verifyToken],
    campaignInterestController.delete
  );

  //PUT  /api/campaignInterest/edit/:id
  router.put(
    "/edit/:id",
    [authJWT.verifyToken],
    campaignInterestController.edit
  );

  //GET   /api/campaignInterest/all/
  router.get("/all", [authJWT.verifyToken], campaignInterestController.all);

  app.use("/api/campaigninterests", router);
};
