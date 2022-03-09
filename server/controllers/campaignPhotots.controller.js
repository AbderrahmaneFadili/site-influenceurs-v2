const db = require("../models");
const config = require("../config/auth.config");
const CampaignPhoto = require("../models/campaignphoto")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");

class CampaignPhotosController {
  /*
   * POST Add Campaign Photos Action
   */
  create = (request, response) => {
    if (request.files) {
      const gallery = [];
      request.files.images.forEach((file) => {
        //move the file uploaded to uploads/campaigns/images
        file.mv(`uploads/campaigns/images/${file.name}`, (error) => {
          if (error) {
            throw error;
          } else {
            const campaignPhoto = {
              campaignId: request.body.campaignId,
              link: `uploads/campaigns/images/${file.name}`,
            };
            gallery.push(campaignPhoto);
          }
        });
      });

      setTimeout(() => {
        if (gallery.length > 0) {
          CampaignPhoto.bulkCreate(gallery).then((gl) => {
            response.send({
              gallery: gl,
              message: "les images sont téléchargées",
            });
          });
        } else {
          response.send({
            message: "Galerie n'existe pas",
          });
        }
      }, 3000);
    }
  };
}

module.exports = new CampaignPhotosController();
