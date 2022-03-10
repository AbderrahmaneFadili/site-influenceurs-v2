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
    const interestsList = request.body.interests.split(",");
    const campaignsInterests = [];
    Campaign.create({
      clientId: request.body.clientId,
      title: request.body.title,
      startDate: request.body.startDate,
      endDate: request.body.startDate,
      presence: request.body.presence,
      numberInfluencers: request.body.numberInfluencers,
      description: request.body.description,
      hashtage: request.body.hashtage,
      accounts: request.body.accounts,
    })
      .then((campaign) => {
        //loop through interestList
        interestsList.forEach((interestId) => {
          campaignsInterests.push({
            campaignId: campaign.id,
            interestId: interestId,
          });
        });
      })
      .catch((err) => {
        return response.status(500).send({
          message: err.message,
        });
      });

    setTimeout(() => {
      CampaignInterest.bulkCreate(campaignsInterests)
        .then((campaignInterests) => {
          response.status(200).send({
            message: "une campaign créé",
          });
        })
        .catch((error) =>
          response.status(500).send({
            message: error.message,
          })
        );
    }, 2000);
  };
  /*
   * GET : /api/campaigns/find
   * find Campaign
   */
  find = (request, response) => {
    Campaign.findByPk(request.params.id)
      .then((campaign) => {
        CampaignInterest.findAll({
          where: {
            campaignId: campaign.id,
          },
        }).then((interests) => {
          response.send({
            id: campaign.id,
            clientId: campaign.clientId,
            title: campaign.title,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            presence: campaign.presence,
            numberInfluencers: campaign.numberInfluencers,
            description: campaign.description,
            hashtage: campaign.hashtage,
            accounts: campaign.accounts,
            interests,
          });
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
