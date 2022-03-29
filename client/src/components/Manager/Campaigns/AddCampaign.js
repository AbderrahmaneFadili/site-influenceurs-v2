import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { connect } from "react-redux";
import { clearMessage } from "../../../redux/actions/message.actions";
import { findAllClientsAction } from "../../../redux/actions/client.actions";

class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: null,
      //data
      campaign: {
        title: "",
        startDate: "",
        endDate: "",
        presence: false,
        numberInfluencers: 0,
        description: "",
        hashtage: "",
        accounts: "",
        interests: [],
      },

      //errors:
      errors: [],
      //error messages
      errorMessages: {
        titleErrorMessage: "",
        startDateErrorMessage: "",
        endDateErrorMessage: "",
        presenceErrorMessage: "",
        numberInfluencersErrorMessage: "",
        descriptionErrorMessage: "",
        hashtageErrorMessage: "",
        accountsErrorMessage: "",
        interestsErrorMessage: "",
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
  }

  //handle Submit
  handleSumbit = (event) => {
    event.preventDefault();

    // errors
    const errors = [];
    // error messages
    let errorsMessages = {};

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

    if (isEmpty(this.state.campaign.numberInfluencers)) {
      errors.push("numberInfluencers");
      errorsMessages = {
        ...errorsMessages,
        numberInfluencersErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        numberInfluencersErrorMessage: "",
      };
    }

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

    if (isEmpty(this.state.campaign.hashtage)) {
      errors.push("hashtage");
      errorsMessages = {
        ...errorsMessages,
        hashtageErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        hashtageErrorMessage: "",
      };
    }

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

    this.setState(
      (prevState) => ({
        ...prevState,
        errors: errors,
        errorsMessages: errorsMessages,
      }),
      () => {
        if (this.state.errors.length === 0) {
          //add campaign action
        }
      }
    );
  };

  render() {
    console.log(this.props);
    return (
      <>
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
          <form onSubmit={this.handleSubmit}>
            <div className="card-body"></div>
          </form>
        </div>
      </>
    );
  }
}

//map state
const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
    loading: state.campaignReducer.loading,
    clientsList: state.clientReducer.clientsList,
  };
};

//map dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
    getClientsList: () => dispatch(findAllClientsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCampaign);
