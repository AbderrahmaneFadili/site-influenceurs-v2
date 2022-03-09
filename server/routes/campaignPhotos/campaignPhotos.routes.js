const { verifySignUp, authJWT } = require("../../middlewares");
const campaignPhotosController = require("../../controllers/campaignPhotots.controller");
const express = require("express");
const router = express.Router();
const fileuploaded = require("express-fileupload");

module.exports = (app) => {
  //use header middleware
  app.use((request, response, next) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Set file uploaded
  app.use(fileuploaded());

  //POST /api/campaignPhotos/create
  router.post(
    "/create",
    [authJWT.verifyToken],
    campaignPhotosController.create
  );
  //GET /api/campaignPhotos/find/4
  router.get("/find/:id", [authJWT.verifyToken], campaignPhotosController.find);
  app.use("/api/campaignPhotos", router);
};
