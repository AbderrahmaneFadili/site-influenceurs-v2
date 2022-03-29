import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CampaignsList from "./CampaignsList";
import AddCampaign from "./AddCampaign";
import EditCampaign from "./EditCampaign";

class Campaign extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="container pt-5">
        <Switch>
          <Route exact path={path} component={CampaignsList} />
          <Route path={`${path}/add`} component={AddCampaign} />
          <Route path={`${path}/edit/:id`} component={EditCampaign} />
        </Switch>
      </div>
    );
  }
}

export default Campaign;
