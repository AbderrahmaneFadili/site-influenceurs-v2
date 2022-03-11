//Verification Token
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

//verify token middleware
const verifyToken = (request, response, next) => {
  //get the token from header
  let token = request.headers["x-access-token"];

  if (!token) {
    response.status(500).send({
      message: "Aucun token fourni !",
    });
    return;
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: "Non autorisé",
      });
    }

    request.userId = decoded.id;
    next();
  });
};

const authJWT = {
  verifyToken,
};

module.exports = authJWT;
