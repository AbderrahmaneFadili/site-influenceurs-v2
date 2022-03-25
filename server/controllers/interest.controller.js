const db = require("../models");
const config = require("../config/auth.config");
const Interest = require("../models/interest")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class InterestController {
  /*
   * POST add interest
   */
  add = (request, response) => {
    Interest.create(request.body)
      .then((interest) => {
        response.send({
          message: "un intérêt est créée",
          interest: {
            id: interest.id,
            title: interest.title,
          },
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * PUT update  interest
   */
  update = (request, response) => {
    Interest.update(request.body, {
      where: {
        id: request.params.id,
      },
    })
      .then((nums) => {
        response.send({
          message: `${nums} interest(s) mise à jour`,
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * GET find  interest
   */
  find = (request, response) => {
    Interest.findByPk(request.params.id)
      .then((interest) => response.send(interest))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * Update interest
   */
  delete = (request, response) => {
    Interest.destroy({
      where: {
        id: request.params.id,
      },
    })
      .then((num) => {
        response.send({
          message:
            num > 0 ? "l'intérêt est supprimé" : "l'intérêt n'est pas supprimé",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * All Interests
   */
  all = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    Interest.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "interests");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new InterestController();
