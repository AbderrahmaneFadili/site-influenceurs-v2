const db = require("../models");
const config = require("../config/auth.config");
const Campaign = require("../models/campaign")(db.sequelize, db.Sequelize);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");
const campaign = require("../models/campaign");
const { response } = require("express");

class CampaignController {
  /*
   * POST : /api/campaigns/add
   * Create Campaign
   */
  create = (request, response) => {
    Campaign.create(request.body)
      .then((campaign) => {
        response.send({
          message: "une campagne est créée",
          campaign: {
            id: campaign.id,
            clientId: campaign.clientId,
            title: campaign.title,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            presence: campaign.presence,
            numberInfluencers: campaign.numberInfluence,
            description: campaign.description,
            hashtage: campaign.hashtage,
            accounts: campaign.accounts,
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
   * GET : /api/campaigns/find
   * find Campaign
   */
  find = (request, response) => {
    Campaign.findByPk(request.params.id)
      .then((campaign) => {
        response.send(campaign);
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
    const id = request.params.id;
    Campaign.update(request.body, {
      where: {
        id,
      },
    })
      .then((nums) =>
        response.send({ message: `${nums} campagne(s) mise à jour` })
      )
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new CampaignController();
