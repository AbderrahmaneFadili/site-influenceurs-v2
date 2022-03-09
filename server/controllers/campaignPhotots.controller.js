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
              link: `uploads/${file.name}`,
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
  /*
   * GET  Campaign Photo Action
   */
  find = (request, response) => {
    const id = request.params.id;
    CampaignPhoto.findByPk(id)
      .then((campaignPhoto) => {
        response.send(campaignPhoto);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * DELETE remove single campaign photo from gallery
   */
  delete = (request, response) => {
    CampaignPhoto.destroy({
      where: {
        id: request.params.id,
      },
    })
      .then((nums) => {
        response.send({
          message:
            nums > 0 ? "une photo est supprimé" : "la photo n'est pas supprimé",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /*
   * DELETE multiple campaign images by campaignId
   */
  deleteAll = (request, response) => {
    CampaignPhoto.destroy({
      where: {
        campaignId: request.params.id,
      },
    })
      .then((nums) => {
        response.send({
          message:
            nums > 0 ? `${nums} photo(s) supprimé` : "aucune photo supprimé",
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
}

module.exports = new CampaignPhotosController();
