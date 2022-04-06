import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteCampaignAction,
  findCampaignAction,
} from "../../../redux/actions/campaigns.actions";
import { findClientAction } from "../../../redux/actions/client.actions";
import {
  deleteAllCampaignsPhotosAction,
  getCampaignsPhotosByCampaignIdAction,
} from "../../../redux/actions/campaignPhotos.actions";
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
        this.props.getCampaignsPhotos(nextProps.campaign.id);
      }
    }
  }

  //handle delete campaign
  handleDeleteCampaign = () => {
    if (this.props.campaign) {
      this.props
        .deleteAllCampignPhotos(this.props.campaign.id)
        .then(() => {
          if (window.confirm("Voulez-vous supprimer cette campagne ?")) {
            this.props
              .deleteCampaign(
                this.props.match.params.id,
                this.props.campaign.id
              )
              .then(() => {
                this.props.history.goBack();
              })
              .catch(() => {
                return null;
              });
          }
        })
        .catch((error) => {
          return null;
        });
    }
  };

  //go to edit campaign
  goToEditPage = (id) => {
    this.props.history.push(`/manager/dashboard/campaigns/${id}`);
  };

  render() {
    console.log(this.props);
    return (
      <>
        {this.props.campaign &&
          this.props.client &&
          this.props.campaignsPhotos && (
            <div className="card-container pt-5 ">
              <div className="card card-indigo">
                <div className="card-header">
                  Détails de la campagne numéro #{this.props.match.params.id}
                </div>
                <div className="card-body">
                  {/* Title */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Titre :
                    </h4>
                    <p className="lead font-weight-normal">
                      {this.props.campaign.title}
                    </p>
                  </div>
                  {/* Client */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Client :
                    </h4>
                    <p className="lead font-weight-normal">
                      {this.props.client.companyName}
                    </p>
                  </div>
                  {/* Start Date */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
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
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
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
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Présence :
                    </h4>
                    <p className="lead font-weight-normal">
                      {this.props.campaign.presence ? "Oui" : "Non"}
                    </p>
                  </div>
                  {/* Umber of Influencers */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Nombre d'influenceurs :
                    </h4>
                    <p className="lead font-weight-normal">
                      {this.props.campaign.numberInfluencers}
                    </p>
                  </div>
                  {/* Description */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Description :
                    </h4>
                    <p
                      className="lead font-weight-normal"
                      dangerouslySetInnerHTML={{
                        __html: this.props.campaign.description.replaceAll(
                          "\n",
                          "<br/>"
                        ),
                      }}
                    />
                  </div>
                  {/* Hashtags */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Hashtags :
                    </h4>
                    <p
                      className="lead font-weight-normal"
                      dangerouslySetInnerHTML={{
                        __html: this.props.campaign.hashtage.replaceAll(
                          "\n",
                          "<br/>"
                        ),
                      }}
                    />
                  </div>
                  {/* Accounts */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-2"
                    >
                      Comptes :
                    </h4>
                    <p
                      className="lead font-weight-normal"
                      dangerouslySetInnerHTML={{
                        __html: this.props.campaign.accounts.replaceAll(
                          "\n",
                          "<br/>"
                        ),
                      }}
                    />
                  </div>
                  {/* Campaign Gallery */}
                  <div className="mb-2">
                    <h4
                      style={{ textDecoration: "underline" }}
                      className="mb-3"
                    >
                      Galerie de la campagne :
                    </h4>
                    <div className="row">
                      {this.props.campaignsPhotos.map(
                        (campaignsPhoto, index) => {
                          return (
                            <div
                              key={index.toString()}
                              className="col-lg-3 col-md-4 mb-3"
                            >
                              <img
                                className="w-100 h-100 rounded img-thumbnail"
                                src={`http://localhost:8080/${campaignsPhoto.link}`}
                                alt="Campaign image"
                                title="Campaign Image"
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex">
                  <div className="my-2 ml-auto">
                    <button
                      className="btn btn-danger mr-2"
                      onClick={this.handleDeleteCampaign}
                    >
                      Supprimer
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(event) =>
                        this.goToEditPage(this.props.campaign.id)
                      }
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    loading: state.campaignReducer.loading,
    campaign: state.campaignReducer.campaign,
    client: state.clientReducer.client,
    campaignsPhotos: state.campaignPhotosReducer.campaignsPhotos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllCampignPhotos: (campaignId) => {
      try {
        dispatch(deleteAllCampaignsPhotosAction(campaignId));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    deleteCampaign: (id, campaignId) => {
      try {
        dispatch(deleteCampaignAction(id, campaignId));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    findCampaign: (id) => {
      try {
        dispatch(findCampaignAction(id));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    findClient: (id) => dispatch(findClientAction(id)),
    getCampaignsPhotos: (campaignId) =>
      dispatch(getCampaignsPhotosByCampaignIdAction(campaignId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
