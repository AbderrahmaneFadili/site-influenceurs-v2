import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { connect } from "react-redux";
import { clearMessage } from "../../../redux/actions/message.actions";
import { findAllClientsAction } from "../../../redux/actions/client.actions";
import { Multiselect } from "multiselect-react-dropdown";
import { findAllInterestAction } from "../../../redux/actions/interest.actions";
import { addCampaignAction } from "../../../redux/actions/campaigns.actions";
import "./Campaign.css";
import { addCampaignPhotosAction } from "../../../redux/actions/campaignPhotos.actions";

class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.Multiselect = React.createRef();
    this.state = {
      shawAddGalleryForm: false,
      successful: null,
      disabledSaveImages: true,
      //data
      campaign: {
        client: "",
        title: "",
        startDate: "",
        endDate: "",
        presence: "",
        numberInfluencers: "",
        description: "",
        hashtag: "",
        accounts: "",
        interests: [],
        photos: null,
      },

      //errors:
      errors: [],
      //error messages
      errorsMessages: {
        clientErrorMessage: "",
        titleErrorMessage: "",
        startDateErrorMessage: "",
        endDateErrorMessage: "",
        presenceErrorMessage: "",
        numberInfluencersErrorMessage: "",
        descriptionErrorMessage: "",
        hashtagErrorMessage: "",
        accountsErrorMessage: "",
        interestsErrorMessage: "",
        photosErrorMessage: "",
      },
    };
  }

  //handle value change
  handleValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      campaign: {
        ...this.state.campaign,
        [name]: value,
      },
    });
  };

  //handle photos change
  handlePhotosChange = (event) => {
    this.setState((prev) => ({
      ...prev,
      disabledSaveImages: false,
      campaign: {
        ...this.state.campaign,
        photos: event.target.files,
      },
    }));
  };

  //on select interests
  onSelect = (selectedList, selectedItem) => {
    this.setState({
      campaign: {
        ...this.state.campaign,
        interests: [...selectedList],
      },
    });
  };

  //on remove interests
  onRemove = (selectedList, removedItem) => {
    this.setState({
      campaign: {
        ...this.state.campaign,
        interests: [...selectedList],
      },
    });
  };

  //handle close alert
  closeAlert = () => {
    this.props.clearMessage();
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  componentDidMount() {
    this.props.getClientsList();
    this.props.getInterestsList();
  }

  //handle Submit
  handleSumbit = (event) => {
    event.preventDefault();

    // errors
    const errors = [];
    // error messages
    let errorsMessages = {};

    //validate client
    if (isEmpty(this.state.campaign.client)) {
      errors.push("client");
      errorsMessages = {
        ...errorsMessages,
        clientErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        clientErrorMessage: "",
      };
    }
    //validate title
    if (isEmpty(this.state.campaign.title)) {
      errors.push("title");
      errorsMessages = {
        ...errorsMessages,
        titleErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        titleErrorMessage: "",
      };
    }
    //validate start date
    if (isEmpty(this.state.campaign.startDate)) {
      errors.push("startDate");
      errorsMessages = {
        ...errorsMessages,
        startDateErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        startDateErrorMessage: "",
      };
    }
    //validate end date
    if (isEmpty(this.state.campaign.endDate)) {
      errors.push("endDate");
      errorsMessages = {
        ...errorsMessages,
        endDateErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        endDateErrorMessage: "",
      };
    }
    //validate presence
    if (isEmpty(this.state.campaign.presence)) {
      errors.push("presence");
      errorsMessages = {
        ...errorsMessages,
        presenceErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        presenceErrorMessage: "",
      };
    }
    //validate numberInfluencers
    if (isEmpty(this.state.campaign.numberInfluencers)) {
      errors.push("numberInfluencers");
      errorsMessages = {
        ...errorsMessages,
        numberInfluencersErrorMessage: "Ce champ est requis!",
      };
    } else if (parseInt(this.state.campaign.numberInfluencers) <= 0) {
      errors.push("numberInfluencers");
      errorsMessages = {
        ...errorsMessages,
        numberInfluencersErrorMessage:
          "le nombre d'influenceurs doit être supérieur à 0",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        numberInfluencersErrorMessage: "",
      };
    }

    //validate description
    if (isEmpty(this.state.campaign.description)) {
      errors.push("description");
      errorsMessages = {
        ...errorsMessages,
        descriptionErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        descriptionErrorMessage: "",
      };
    }

    //validate hashtag
    if (isEmpty(this.state.campaign.hashtag)) {
      errors.push("hashtag");
      errorsMessages = {
        ...errorsMessages,
        hashtagErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        hashtagErrorMessage: "",
      };
    }

    //validate accounts
    if (isEmpty(this.state.campaign.accounts)) {
      errors.push("accounts");
      errorsMessages = {
        ...errorsMessages,
        accountsErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        accountsErrorMessage: "",
      };
    }

    //validate interests
    if (this.state.campaign.interests.length === 0) {
      errors.push("interests");
      errorsMessages = {
        ...errorsMessages,
        interestsErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        interestsErrorMessage: "",
      };
    }

    this.setState(
      (prevState) => ({
        ...prevState,
        errors: errors,
        errorsMessages: errorsMessages,
      }),
      () => {
        if (this.state.errors.length === 0) {
          //add campaign action
          this.props
            .addCampaignAction(this.state.campaign)
            .then(() => {
              this.setState({
                ...this.state,
                shawAddGalleryForm: true,
                successful: true,
                //resest state
                campaign: {
                  client: "",
                  title: "",
                  startDate: "",
                  endDate: "",
                  presence: "",
                  numberInfluencers: "",
                  description: "",
                  hashtag: "",
                  accounts: "",
                  interests: [],
                },
              });
              console.log(this.state.campaign);
              //remove Selected Values From Options in Multiselect
              this.Multiselect.current.resetSelectedValues();
            })
            .catch(() => {
              this.setState({
                ...this.state,
                successful: false,
              });
            });
        } else {
          console.log(this.state.errorsMessages);
          console.log(this.state.campaign);
        }
      }
    );
  };
  //handle submit photos
  handleSumbitPhotos = (event) => {
    event.preventDefault();

    const errors = [];

    let errorsMessages = {};

    if (this.state.campaign.photos === null) {
      console.log("this.state.campaign.photos :", this.state.campaign.photos);
      errors.push("photos");
      errorsMessages = {
        ...errorsMessages,
        photosErrorMessage: "Ce champs est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        photosErrorMessage: "",
      };
    }

    this.setState(
      {
        ...this.state,
        errors: errors,
        errorsMessages: errorsMessages,
      },
      () => {
        if (this.state.errors.length === 0 && this.props.addedCampaign) {
          this.props
            .addCampaignPhotosAction(
              this.state.campaign.photos,
              this.props.addedCampaign.id
            )
            .then(() => {
              this.setState({
                ...this.state,
                successful: true,
                shawAddGalleryForm: false,
              });
              window.scrollTo(0, 0);
            })
            .catch(() => {
              this.setState({
                ...this.state,
                successful: false,
              });
            });
        }
      }
    );
  };

  render() {
    console.log(this.props);
    console.log(this.state.campaign);
    console.log(this.state.errorsMessages);
    console.log(this.state.errors);
    console.log(this.state);
    return (
      <div className="pt-5">
        <Link to="/manager/dashboard/campaigns">Retour à la liste</Link>
        {this.state.successful === true && (
          <Alert className="mt-3 row align-items-center" variant="success">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeAlert}
            ></i>
          </Alert>
        )}
        {this.state.successful === false && (
          <Alert className="mt-3 row align-items-center" variant="danger">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeAlert}
            ></i>
          </Alert>
        )}
        <div className="card card-indigo mt-3">
          <div className="card-header">
            <h3 className="card-title">Ajouter une campagne</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSumbit}>
            <div className="card-body">
              {/* Client */}
              <div className="form-group">
                <label htmlFor="client">Client</label>
                <select
                  className={
                    this.hasError("client")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="client"
                  name="client"
                  onChange={this.handleValueChange}
                >
                  <option value={""} selected={this.state.successful && true}>
                    Sélectionner un client
                  </option>
                  {this.props.clientsList &&
                    this.props.clientsList.list.map((client) => (
                      <option value={client.id} key={client.id}>
                        {client.companyName}
                      </option>
                    ))}
                </select>
                <span
                  className={
                    this.hasError("client")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.clientErrorMessage &&
                    this.state.errorsMessages.clientErrorMessage}
                </span>
              </div>
              {/* Titre */}
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  value={this.state.campaign.title}
                  onChange={this.handleValueChange}
                  type="text"
                  className={
                    this.hasError("title")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="title"
                  id="title"
                  placeholder="Titre"
                />
                <span
                  className={
                    this.hasError("title")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.titleErrorMessage &&
                    this.state.errorsMessages.titleErrorMessage}
                </span>
              </div>
              {/* date debut */}
              <div className="form-group">
                <label htmlFor="startDate">Date de début</label>
                <input
                  value={this.state.campaign.startDate}
                  onChange={this.handleValueChange}
                  type="date"
                  className={
                    this.hasError("startDate")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="startDate"
                  id="startDate"
                />
                <span
                  className={
                    this.hasError("startDate")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.startDateErrorMessage &&
                    this.state.errorsMessages.startDateErrorMessage}
                </span>
              </div>
              {/* date de fin */}
              <div className="form-group">
                <label htmlFor="endDate">Date de fin</label>
                <input
                  value={this.state.campaign.endDate}
                  onChange={this.handleValueChange}
                  type="date"
                  className={
                    this.hasError("endDate")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="endDate"
                  id="endDate"
                  placeholder="date de fin"
                />
                <span
                  className={
                    this.hasError("endDate")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.endDateErrorMessage &&
                    this.state.errorsMessages.endDateErrorMessage}
                </span>
              </div>
              {/* Centre d'intérêt */}
              <div className="form-group">
                <label htmlFor="interest">Centre d'intérêt</label>

                <Multiselect
                  options={
                    this.props.interestsList !== null &&
                    this.state.successful === null
                      ? this.props.interestsList.list
                      : []
                  }
                  ref={this.Multiselect}
                  closeIcon="<i class='fas fa-times'></i>"
                  onRemove={this.onRemove}
                  onSelect={this.onSelect}
                  displayValue={"title"}
                  name="interest"
                  id="interest"
                  placeholder="Centres d'intérêts"
                  style={{
                    highlightOptions: {
                      backgroundColor: "#6610f2",
                    },
                    chips: {
                      backgroundColor: "#6610f2",
                    },
                    searchBox: {
                      borderColor: this.hasError("interests") ? "#dc3545" : "",
                      marginBottom: 6,
                    },
                  }}
                />
                <span
                  style={{
                    fontSize: 12.22,
                    color: this.hasError("interests") ? "#dc3545" : "",
                    visibility: this.hasError("interests")
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {this.state.errorsMessages.interestsErrorMessage &&
                    this.state.errorsMessages.interestsErrorMessage}
                </span>
              </div>

              {/* Presence */}
              <div className="form-group">
                <label htmlFor="presence">Présence</label>

                <div className="form-check">
                  <label
                    className="form-check-label"
                    style={{
                      color: this.hasError("interests") ? "#dc3545" : "",
                    }}
                  >
                    <input
                      checked={this.state.successful && false}
                      id="presence"
                      value={"1"}
                      name="presence"
                      type="radio"
                      className={"form-check-input"}
                      onChange={this.handleValueChange}
                    />
                    Oui
                  </label>
                </div>
                <div className="form-check">
                  <label
                    className="form-check-label"
                    style={{
                      color: this.hasError("presence") ? "#dc3545" : "",
                    }}
                  >
                    <input
                      checked={this.state.successful && false}
                      value={"0"}
                      id="presence"
                      name="presence"
                      type="radio"
                      className={"form-check-input"}
                      onChange={this.handleValueChange}
                    />
                    Non
                  </label>
                </div>

                <span
                  style={{
                    fontSize: 12.22,
                    color: this.hasError("presence") ? "#dc3545" : "",
                    visibility: this.hasError("presence")
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {this.state.errorsMessages.presenceErrorMessage &&
                    this.state.errorsMessages.presenceErrorMessage}
                </span>
              </div>
              {/* Number of influencers */}
              <div className="form-group">
                <label htmlFor="numberOfInfluencers">
                  Nombre des influenceurs
                </label>
                <input
                  value={this.state.campaign.numberInfluencers}
                  onChange={this.handleValueChange}
                  type="number"
                  className={
                    this.hasError("numberInfluencers")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="numberInfluencers"
                  id="numberOfInfluencers"
                  placeholder="Le nombre des influenceurs"
                />
                <span
                  className={
                    this.hasError("numberInfluencers")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.numberInfluencersErrorMessage &&
                    this.state.errorsMessages.numberInfluencersErrorMessage}
                </span>
              </div>
              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={this.state.campaign.description}
                  onChange={this.handleValueChange}
                  name="description"
                  id="description"
                  rows="4"
                  className={
                    this.hasError("description")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Votre description..."
                ></textarea>
                <span
                  className={
                    this.hasError("description")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.descriptionErrorMessage &&
                    this.state.errorsMessages.descriptionErrorMessage}
                </span>
              </div>
              {/* Hashtag */}
              <div className="form-group">
                <label htmlFor="hashtag">Hashtag</label>
                <textarea
                  value={this.state.campaign.hashtag}
                  onChange={this.handleValueChange}
                  name="hashtag"
                  id="hashtag"
                  rows="4"
                  className={
                    this.hasError("hashtag")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="@hashtag1, @hashtag2, @hashtag3..."
                ></textarea>
                <span
                  className={
                    this.hasError("hashtag")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.hashtagErrorMessage &&
                    this.state.errorsMessages.hashtagErrorMessage}
                </span>
              </div>
              {/* Accounts */}
              <div className="form-group">
                <label htmlFor="accounts">Comptes</label>
                <textarea
                  value={this.state.campaign.accounts}
                  onChange={this.handleValueChange}
                  name="accounts"
                  id="accounts"
                  rows="4"
                  className={
                    this.hasError("accounts")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="@compte1, @compte2, @compte3..."
                ></textarea>
                <span
                  className={
                    this.hasError("accounts")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.accountsErrorMessage &&
                    this.state.errorsMessages.accountsErrorMessage}
                </span>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success"
                disabled={
                  this.state.successful === true &&
                  this.state.shawAddGalleryForm === true
                    ? true
                    : false
                }
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
        {/* Add Campaign Gallery */}
        {this.state.shawAddGalleryForm === true && (
          <div className="card card-indigo mt-3">
            <div className="card-header">
              <h3 className="card-title">
                Ajouter galerie photot pour la campagne :{" "}
                {this.props.addedCampaign && this.props.addedCampaign.title}
              </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={this.handleSumbitPhotos}>
              <div className="card-body">
                <label htmlFor="photos">Photos de la campagne</label>
                <input
                  onChange={this.handlePhotosChange}
                  type="file"
                  multiple
                  className={
                    this.hasError("photos")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  accept="image/*"
                  name="photos"
                  id="photos"
                  placeholder="photo(s) de la campagne"
                />
                <span
                  className={
                    this.hasError("photos")
                      ? "error invalid-feedback mt-2"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.photosErrorMessage &&
                    this.state.errorsMessages.photosErrorMessage}
                </span>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-success"
                  disabled={
                    this.state.disabledSaveImages === true ? true : false
                  }
                >
                  Enregister
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

//map state
const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    loading: state.campaignReducer.loading,
    clientsList: state.clientReducer.clientsList,
    interestsList: state.interestReducer.interestsList,
    addedCampaign: state.campaignReducer.addedCampaign,
    gallery: state.campaignPhotosReducer.createdGallery,
  };
};

//map dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    addCampaignPhotosAction: (photos, campaignId) => {
      try {
        dispatch(addCampaignPhotosAction(photos, campaignId));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    clearMessage: () => dispatch(clearMessage()),
    getClientsList: () => dispatch(findAllClientsAction()),
    getInterestsList: () => dispatch(findAllInterestAction()),
    addCampaignAction: (campaign) => {
      try {
        dispatch(addCampaignAction(campaign));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCampaign);
