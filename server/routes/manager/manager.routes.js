const { verifySignUp, authJWT } = require("../../middlewares");
const managerController = require("../../controllers/manager.controller");
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

  //GET /api/manager/me/:id
  router.get("/me/:id", [authJWT.verifyToken], managerController.me);

  app.use("/api/manager", router);
};
