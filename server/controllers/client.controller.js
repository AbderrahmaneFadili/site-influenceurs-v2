const db = require("../models");
const config = require("../config/auth.config");
const Client = require("../models/client")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;

class ClientController {
  /*
   * POST /api/clients/add
   * Create Action
   */
  create = (request, response) => {
    //  Save Model in DB
    Client.create(request.body)
      .then((client) => {
        response.send({
          message: "Un client ajouté",
          client: {
            id: client.id,
            companyName: client.companyName,
            country: client.country,
            city: client.city,
            street: client.street,
            directorName: client.directorName,
            tel: client.tel,
            email: client.email,
          },
        });
      })
      .then((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * POST /api/clients/find
   * Find Client Action
   */
  find = (request, response) => {
    const id = request.params.id;

    Client.findByPk(id)
      .then((client) => response.send(client))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * POST /api/clients/edit
   * Edit Client Action
   */
  update = (request, response) => {
    const id = request.params.id;
    //Update client and save in DB
    Client.update(request.body, {
      where: {
        id,
      },
    })
      .then((nums) =>
        response.send({
          message: `${nums} client(s) mis à jour`,
        })
      )
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new ClientController();
