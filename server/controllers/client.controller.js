const db = require("../models");
const config = require("../config/auth.config");
const Client = require("../models/client")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class ClientController {
  /*
   * POST /api/clients/add
   * Create Action
   */
  create = (request, response) => {
    //  Save Model in DB
    Client.create(request.body)
      .then((client) => {
        response.status(200).send({
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
      .catch((error) => {
        response.status(500).send({
          message: error.message || "erreur lors de l'ajout du client",
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
  /*
   * POST /api/clients/delete
   * Delete Client Action
   */
  delete = (request, response) => {
    const id = request.params.id;
    Client.destroy({
      where: { id },
    })
      .then((num) => {
        response.send({
          message:
            num > 0 ? "un client est supprimé" : "le client n'est pas supprimé",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };

  /*
   * GET /api/clients/all
   * Get all Clients Action
   */
  all = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    Client.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "clients");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new ClientController();
