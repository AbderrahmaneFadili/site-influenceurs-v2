const { verifySignUp, authJWT } = require("../../middlewares");
const campaignController = require("../../controllers/campaign.controller");
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

  //POST /api/campaigns/add
  router.post("/add", [authJWT.verifyToken], campaignController.create);
  //GET /api/campaigns/find
  router.get("/find/:id", [authJWT.verifyToken], campaignController.find);
  //DELETE /api/campaigns/delete
  router.delete(
    "/delete/:id",
    [authJWT.verifyToken],
    campaignController.delete
  );
  //PUT /api/campaigns/edit
  router.put("/edit/:id", [authJWT.verifyToken], campaignController.edit);
  //GET /api/campaigns/all
  router.get("/all", [authJWT.verifyToken], campaignController.all);

  app.use("/api/campaigns", router);
};
