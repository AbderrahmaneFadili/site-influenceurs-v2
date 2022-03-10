const db = require("../models");
const config = require("../config/auth.config");
const Campaign = require("../models/campaign")(db.sequelize, db.Sequelize);
const CampaignInterest = require("../models/campaigninterest")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class CampaignController {
  /*
   * POST : /api/campaigns/add
   * Create Campaign
   */
  create = (request, response) => {
    Campaign.create(request.body)
      .then((campaign) => {
        response.status(200).send({
          id: campaign.id,
          clientId: campaign.clientId,
          title: campaign.title,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          presence: campaign.presence,
          numberInfluencers: campaign.numberInfluencers,
          description: campaign.description,
          hashtage: campaign.hashtage,
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * GET : /api/campaigns/find
   * find Campaign
   */
  find = (request, response) => {
    Campaign.findByPk(request.params.id)
      .then((campaign) => {
        response.status(200).send({
          id: campaign.id,
          clientId: campaign.clientId,
          title: campaign.title,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          presence: campaign.presence,
          numberInfluencers: campaign.numberInfluencers,
          description: campaign.description,
          hashtage: campaign.hashtage,
        });
      })
      .catch((err) => {
        response.status(500).send({
          message: err.message,
        });
      });
  };
  /*
   * GET : /api/campaigns/find
   * delete Campaign
   */
  delete = (request, response) => {
    const id = request.params.id;
    Campaign.destroy({
      where: {
        id,
      },
    })
      .then((num) => {
        response.send({
          message:
            num > 0
              ? "une campagne est supprimé"
              : "la campagne n'est pas supprimé",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * PUT : /api/campaigns/edit
   * Edit Campaign
   */
  edit = (request, response) => {
    Campaign.destroy({
      where: { id },
    })
      .then((num) => {
        response.status(200).send({
          message: `${num} campagne(s) est supprimée`,
        });
      })
      .catch((err) =>
        response.status(500).send({
          message: err.message,
        })
      );
  };
  /*
   * GET : /api/campaigns/all
   * Get all Campaigns with pagination
   */
  all = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);

    Campaign.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "campaigns");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new CampaignController();
