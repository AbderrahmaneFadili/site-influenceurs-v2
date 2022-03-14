const { verifySignUp, authJWT } = require("../middlewares");
const db = require("../models");
const Influencer = require("../models/influencer")(db.sequelize, db.Sequelize);
const TemporaryInfluencer = require("../models/temporaryinfluencer")(
  db.sequelize,
  db.Sequelize
);
const Operations = db.Sequelize.Op;
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios").default;
const rapidapiKey = require("../api/rapidapi-key");
const baseURL = require("../api/api");

class InfluencerController {
  /*
   * POST Register Action /api/influencers
   */
  register = (request, response) => {
    //get email from the request body
    const email = request.body.email;
    //generate the token using the email and jwt
    const token = jwt.sign({ email }, config.secret, {
      expiresIn: 86400, // 24 hours,
    });

    //Insert the email & token in a temporary influencer table
    TemporaryInfluencer.create({
      email,
      rememberToken: token,
    })
      .then((temporaryInfluencer) => {
        if (temporaryInfluencer) {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "out.postassl.it",
            port: 465,
            secure: true,
            auth: {
              user: "postmaster@3wdev.ma",
              pass: "3w_2022_Dev",
            },
          });

          // send mail with defined transport object
          transporter
            .sendMail({
              from: "postmaster@3wdev.ma",
              to: email,
              subject: "Confirmation d'email",
              text: "Hello World",
              html: /*html*/ `
        <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
              <p>
               <a target="_blank"
               href=http://localhost:8080/api/influencers/email-confirmation?email=${email}&token=${token}>
                 Confirmer votre email</a>
              </p>
          </body>
          </html>
      `,
            })
            .then((info) => {
              response.send({
                message: "Email Envoyé",
                email,
                token,
                info,
              });
            });
        }
      })
      .catch((error) => {
        response.status(500).send({
          message: error,
        });
      });
  };

  /*
   * POST Email Confirmation Actin
   */
  emailConfirmation = (request, response) => {
    const { token, email } = request.query;

    //find one the temporary influencer by token & email
    /// if exists so :
    /// => change temporary influencer emailVerification to true
    // after that Insert the temporary data into Influencers table
    //  => if the influencer is created so send reponse message "email is verified"
    /// if not exists
    /// => send message user not exists

    TemporaryInfluencer.findOne({
      where: {
        email: email,
        rememberToken: token,
      },
    })
      .then((temporaryInfluencer) => {
        if (temporaryInfluencer) {
          TemporaryInfluencer.update(
            {
              emailVerification: true,
            },
            {
              where: {
                email: email,
                rememberToken: token,
              },
            }
          ).then((num) => {
            if (num > 0) {
              Influencer.create({
                email: email,
                rememberToken: token,
                emailVerification: true,
              })
                .then((influencer) => {
                  TemporaryInfluencer.destroy({ where: {} }).then(() => {
                    console.log("Temporaray influcencer is deleted");
                    response.redirect("http://localhost:3000");
                    // response.send({
                    //   message: "l'e-mail est vérifié",
                    // });
                  });
                })
                .catch((err) => response.send({ message: err.message }));
            } else {
              respons.send({
                message: "l'email n'est pas verifié",
              });
            }
          });
        } else {
          response.send({
            message: "l'email n'existe pas",
          });
        }
      })
      .catch((err) => {
        response.send({
          message: err.message,
        });
      });
  };

  //validate instagram account
  validateInstagramAccount = (request, response) => {
    //get the body data
    const { username_instagram } = request.body;

    //axios request options
    const options = {
      method: "GET",
      url: `${baseURL}/${username_instagram}/info`,
      headers: {
        "x-rapidapi-host": "instagram85.p.rapidapi.com",
        "x-rapidapi-key": rapidapiKey,
      },
    };
    //make axios requet
    axios
      .request(options)
      .then(function (res) {
        //send the  user instagram data from the instgram api
        response.status(200).send({
          instagram_user_found: res.data.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //complet profile
  comapletProfile = (response, request) => {};
}

module.exports = new InfluencerController();
