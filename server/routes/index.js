const authRoute = require("../routes/auth/auth.routes");
const managerRoute = require("../routes/manager/manager.routes");
const clientRoutes = require("../routes/client/client.routes");
const campaignRoutes = require("../routes/campaign/campaign.routes");
const interestRoutes = require("../routes/interest/interest.routes");
const campaignPhotosRoutes = require("../routes/campaignPhotos/campaignPhotos.routes");
const campaignInterestsRoutes = require("../routes/campaignInterest/campaignInterest.routes");
const influencerRoutes = require("../routes/influencer/influencer.routes");

module.exports = {
  authRoute,
  managerRoute,
  clientRoutes,
  campaignRoutes,
  interestRoutes,
  campaignPhotosRoutes,
  campaignInterestsRoutes,
  influencerRoutes,
};
