import React, { Component } from "react";

class CampaignDetails extends Component {
  render() {
    return <div>CampaignDetails : {this.props.match.params.id}</div>;
  }
}

export default CampaignDetails;
