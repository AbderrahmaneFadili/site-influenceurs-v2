const db = require("../models");
const config = require("../config/auth.config");
const InfluencerInterest = require("../models/interestinfluencer")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class InfluencerInterestController {
  /*
   * Add Action
   */
  add = (request, response) => {
    InfluencerInterest.create(request.body)
      .then((influencerInterest) => response.send(influencerInterest))
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Delete Action
   */
  delete = (request, response) => {
    InfluencerInterest.destroy({
      where: {
        influencerId: request.query.influencerId,
        interestId: request.query.interestId,
      },
    })
      .then((num) => {
        if (num > 0) {
          response.send({
            message: "centre d'intérêt de l'influenceur est supprimée",
          });
        } else {
          response.send({
            message: "centre d'intérêt de l'influenceur n'est pas supprimée",
          });
        }
      })
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Edit Action
   */
  edit = (request, response) => {
    InfluencerInterest.update(request.body, {
      where: {
        id: request.params.id,
      },
    })
      .then((num) => {
        if (num > 0) {
          response.send({
            message: "centre d'intérêt de l'influenceur est mise à jour",
          });
        } else {
          response.send({
            message: "centre d'intérêt de l'influenceur n'est pas mise à jour",
          });
        }
      })
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Find Action
   */
  find = (request, response) => {
    InfluencerInterest.findByPk(request.params.id)
      .then((influencerInterest) => {
        if (influencerInterest) {
          response.send(influencerInterest);
        } else {
          response.send({
            message: "centre d'intérêt n'exists pas",
          });
        }
      })
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * Find All Action
   */
  findAll = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);
    InfluencerInterest.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(
          data,
          page,
          limit,
          "centre d'intérêts d'influenceur"
        );
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new InfluencerInterestController();
