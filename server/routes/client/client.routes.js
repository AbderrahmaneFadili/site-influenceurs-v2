const { verifySignUp, authJWT } = require("../../middlewares");
const clientController = require("../../controllers/client.controller");
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

  //POST /api/clients/add
  router.post("/add", [authJWT.verifyToken], clientController.create);

  app.use("/api/clients", router);
};
