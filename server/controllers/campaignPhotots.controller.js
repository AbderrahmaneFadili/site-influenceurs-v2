const db = require("../models");
const config = require("../config/auth.config");
const CampaignPhoto = require("../models/campaignphoto")(
  db.sequelize,
  db.Sequelize
);
const Operation = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../helpers/paginationHelper");
const fs = require("fs");

class CampaignPhotosController {
  /*
   * POST Add Campaign Photos Action
   */
  create = (request, response) => {
    console.log("request.files : ", request.files);
    console.log("campaign id : ", request.body.campaignId);

    let gallery = [];

    request.files.forEach((file) => {
      const campaignPhoto = {
        campaignId: request.body.campaignId,
        link: file.path,
      };
      gallery.push(campaignPhoto);
    });

    setTimeout(() => {
      if (gallery.length > 0) {
        CampaignPhoto.bulkCreate(gallery)
          .then((gl) => {
            response.send({
              gallery: gl,
              message: "les images sont téléchargées",
            });
          })
          .catch((error) => {
            response.send({
              message: "les images ne sont pas téléchargées",
            });
          });
      }
    }, 3000);
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
        id: request.query.id,
      },
    })
      .then((num) => {
        if (num > 0) {
          fs.unlink(request.query.imageUrl, (err) =>
            err
              ? response.send({
                  message: err.message,
                })
              : response.send({
                  message: "photo supprimée",
                })
          );
        }
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
    let isDeleted = false;
    CampaignPhoto.findAll({
      where: {
        campaignId: request.params.id,
      },
    })
      .then((cps) => {
        cps.forEach((cp) => {
          CampaignPhoto.destroy({
            where: {
              id: cp.id,
            },
          }).then((num) => {
            if (num > 0) {
              fs.unlink(cp.link, (err) =>
                err ? (isDeleted = false) : (isDeleted = true)
              );
            }
          });
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });

    setTimeout(
      () =>
        isDeleted
          ? response.send({
              message: "La galerie est supprimée",
            })
          : response.send({
              message: "La galerie n'est pas supprimée",
            }),
      5000
    );
  };
  /*
   * GET get all
   */
  all = (request, response) => {
    //get the query params
    const { page, size } = request.query;
    const { limit, offset } = getPagination(page, size);

    CampaignPhoto.findAndCountAll({
      limit,
      offset,
    })
      .then((data) => {
        const result = getPagingData(data, page, limit, "campaignPhotos");
        response.send(result);
      })
      .catch((error) => {
        response.status(500).send({
          message: error.message,
        });
      });
  };
  /**
   * Get by campaign id
   */
  getByCampaignId = (request, response) => {
    CampaignPhoto.findAll({
      where: {
        campaignId: request.query.campaignId,
      },
    })
      .then((campaignPhotos) => response.status(200).send(campaignPhotos))
      .catch((error) =>
        response.status(500).send({
          message: error.message,
        })
      );
  };
  //Edit campaign photos
  edit = (request, response) => {
    const campaignPhotoId = request.body.campaignPhotoId;
    const image = request.file;
    console.log(image);

    CampaignPhoto.findOne({
      where: {
        id: campaignPhotoId,
      },
    }).then((campaignPhoto) => {
      //remove the image form directory
      fs.unlinkSync(campaignPhoto.link);
      //Campaign Photo update
      CampaignPhoto.update(
        {
          link: image.path,
        },
        {
          where: {
            id: campaignPhotoId,
          },
        }
      )
        .then((numCount) => {
          return response.status(200).send({
            message: `${numCount} campaign photo is updated`,
          });
        })
        .catch((error) => {
          return response.status(500).send({
            message: error.message,
          });
        });
    });
  };
}

module.exports = new CampaignPhotosController();
