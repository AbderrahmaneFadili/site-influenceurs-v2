const express = require("express");
const cors = require("cors");
const app = express();

//CORS options
const corsOptions = {
  origin: "http://localhost:3000",
};

//Set CORS Options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//set up the uploads endpoint
app.use(
  "/uploads/campaigns/images",
  express.static("uploads/campaigns/images")
);

// simple request
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API REST Site Influenceurs V2.",
  });
});

//Set up auth routes
require("./routes").authRoute(app);
//Set up manager routes
require("./routes").managerRoute(app);
//Set up client routes
require("./routes").clientRoutes(app);
//Set up campaign routes
require("./routes").campaignRoutes(app);
//Set up interest routes
require("./routes").interestRoutes(app);
//Set up campaign photos routes
require("./routes").campaignPhotosRoutes(app);
//Set up campaign interests routes
require("./routes").campaignInterestsRoutes(app);
//Set up influcer routes
require("./routes").influencerRoutes(app);
//Set up study level routes
require("./routes").studylevelRoutes(app);
//Set up language routes
require("./routes").languageRoutes(app);
//Set up  influencer language routes
require("./routes").influencerlanguagesRoutes(app);
//Set up influencer Interest routes
require("./routes").influencerInterestRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
