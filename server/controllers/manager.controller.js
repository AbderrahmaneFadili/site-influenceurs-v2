const db = require("../models");
const config = require("../config/auth.config");
const Manager = require("../models/manager")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;

class ManagerController {
  /*
   * GET /api/manager/me
   * me action
   */
  me = (request, response) => {
    //find manager by pk
    Manager.findByPk(request.params.id)
      .then((manager) => {
        response.send(manager);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new ManagerController();
