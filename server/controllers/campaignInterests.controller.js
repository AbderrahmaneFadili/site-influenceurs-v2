const db = require("../models");
const config = require("../config/auth.config");
const CampaignInterest = require("../models/campaigninterest")(
  db.sequelize,
  db.Sequelize
);
const Interest = require("../models/interest")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class CampaignInterestController {
  /*
   * POST create campaign
   */
  create = (request, response) => {
    const { interestId, campaignId } = request.query;

    CampaignInterest.create({
      interestId: parseInt(interestId),
      campaignId: parseInt(campaignId),
    })
      .then((campaignInterest) => response.send(campaignInterest))
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  /*
   * GET find campaign interest by campaign interest id
   */
  find = (request, response) => {
    CampaignInterest.findByPk(request.params.id)
      .then((campaignInterest) => response.send(campaignInterest))
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * GET find all campaigns by campaignId
   */
  findByCampaignId = (request, response) => {
    const campaignId = request.query.campaignId;

    db.sequelize
      .query(
        `SELECT ints.id,ints.title FROM site_influencers.CampaignInterests  campInterests 
        INNER JOIN interests ints ON campInterests.interestId = ints.id WHERE campaignId = ${campaignId};`
      )
      .then((results) => {
        const campaignInterests = results[0];
        return response.send({
          list: campaignInterests,
        });
      })
      .catch((error) => {
        return response.status(500).send({
          error: error.message,
        });
      });
  };

  /*
   * DELETE delete campaign interest by campaign interest id
   */
  delete = (request, response) => {
    const id = request.params.id;
    CampaignInterest.destroy({
      where: {
        id,
      },
    })
      .then((num) => {
        response.send({
          message:
            num > 0
              ? `une centre d'interet d'une campagne supprimées`
              : `aucune centre d'interet d'une campagne supprimées`,
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * PUT update campaign interest by campaign interest id
   */
  edit = (request, response) => {
    const id = request.params.id;
    CampaignInterest.update(request.body, {
      where: { id },
    })
      .then(() =>
        response.send({
          message: "centre d'intérêt de la campagne est mis à jour",
        })
      )
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * GET get all campaigns interests
   */
  all = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);

    CampaignInterest.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "campaignInterests");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new CampaignInterestController();
