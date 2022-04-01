import React, { Component } from "react";
import { connect } from "react-redux";
import { findCampaignAction } from "../../../redux/actions/campaigns.actions";
import { findClientAction } from "../../../redux/actions/client.actions";
// import {} from "../../../redux/actions/campaignPhotos.actions";
import moment from "moment";
import "moment/locale/fr";
import { isEqual } from "lodash";

class CampaignDetails extends Component {
  componentDidMount() {
    this.props.findCampaign(this.props.match.params.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.campaign, this.props.campaign)) {
      if (nextProps.campaign) {
        this.props.findClient(nextProps.campaign.clientId);
      }
    }
  }

  render() {
    console.log(this.props);
    return (
      <>
        {this.props.campaign && this.props.client && (
          <div className="card-container pt-5 ">
            <div className="card card-indigo">
              <div className="card-header">
                Détails de la campagne numéro #{this.props.match.params.id}
              </div>
              <div className="card-body">
                {/* Title */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Titre :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.title}
                  </p>
                </div>
                {/* Client */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Client :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.client.companyName}
                  </p>
                </div>
                {/* Start Date */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Date de début :
                  </h4>
                  <p className="lead font-weight-normal">
                    {moment(this.props.campaign.startDate)
                      .locale("fr")
                      .format("D MMMM YYYY")}
                  </p>
                </div>
                {/* End Date */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Date de fin :
                  </h4>
                  <p className="lead font-weight-normal">
                    {moment(this.props.campaign.endDate)
                      .locale("fr")
                      .format("D MMMM YYYY")}
                  </p>
                </div>
                {/* Présence */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Présence :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.presence ? "Oui" : "Non"}
                  </p>
                </div>
                {/* Umber of Influencers */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Nombre d'influenceurs :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.numberInfluencers}
                  </p>
                </div>
                {/* Description */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Description :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.description}
                  </p>
                </div>
                {/* Hashtags */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Hashtags :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.hashtage}
                  </p>
                </div>
                {/* Accounts */}
                <div className="mb-2">
                  <h4 style={{ textDecoration: "underline" }} className="mb-2">
                    Comptes :
                  </h4>
                  <p className="lead font-weight-normal">
                    {this.props.campaign.accounts}
                  </p>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.campaignReducer.loading,
    campaign: state.campaignReducer.campaign,
    client: state.clientReducer.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findCampaign: (id) => {
      try {
        dispatch(findCampaignAction(id));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    findClient: (id) => dispatch(findClientAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
