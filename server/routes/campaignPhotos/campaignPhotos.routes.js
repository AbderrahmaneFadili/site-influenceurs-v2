const { verifySignUp, authJWT } = require("../../middlewares");
const campaignPhotosController = require("../../controllers/campaignPhotots.controller");
const express = require("express");
const router = express.Router();
const uploadHelper = require("../../helpers/uploadHelper");

module.exports = (app) => {
  //use header middleware
  app.use((request, response, next) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST /api/campaignPhotos/create
  router.post(
    "/create",
    [authJWT.verifyToken],
    uploadHelper.upload.array("images", 30),
    campaignPhotosController.create
  );
  //GET /api/campaignPhotos/find/
  router.get("/find/:id", [authJWT.verifyToken], campaignPhotosController.find);
  //DELETE /api/campaignPhotos/delete/
  router.delete(
    "/delete",
    [authJWT.verifyToken],
    campaignPhotosController.delete
  );
  //DELETE /api/campaignPhotos/deleteAll
  router.delete(
    "/deleteAll/:id",
    [authJWT.verifyToken],
    campaignPhotosController.deleteAll
  );
  //GET /api/campaignPhotos/all
  router.get("/all", [authJWT.verifyToken], campaignPhotosController.all);
  //GET /api/campaignPhotots/findByCampaign
  router.get(
    "/findByCampaign",
    [authJWT.verifyToken],
    campaignPhotosController.getByCampaignId
  );
  app.use("/api/campaignPhotos", router);
};
