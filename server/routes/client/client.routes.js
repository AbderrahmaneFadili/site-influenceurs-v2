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

  //GET /api/clients/find/:id
  router.get("/find/:id", [authJWT.verifyToken], clientController.find);

  //PUT /api/clients/edit/:id
  router.put("/edit/:id", [authJWT.verifyToken], clientController.update);

  //DELETE /api/clients/edit/:id
  router.delete("/delete/:id", [authJWT.verifyToken], clientController.delete);

  //GET /api/clients/all
  router.get("/all", [authJWT.verifyToken], clientController.all);

  //GET /api/clients/findAll
  router.get("/findAll", [authJWT.verifyToken], clientController.findAll);

  app.use("/api/clients", router);
};
