import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CampaignsList from "./CampaignsList";
import AddCampaign from "./AddCampaign";
import EditCampaign from "./EditCampaign";
import CampaignDetails from "./CampaignDetails";

class Campaign extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="container-fluid">
        <Switch>
          <Route exact path={path} component={CampaignsList} />
          <Route path={`${path}/add`} component={AddCampaign} />
          <Route path={`${path}/edit/:id`} component={EditCampaign} />
          <Route path={`${path}/details/:id`} component={CampaignDetails} />
        </Switch>
      </div>
    );
  }
}

export default Campaign;
