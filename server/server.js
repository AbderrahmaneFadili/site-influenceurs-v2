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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
