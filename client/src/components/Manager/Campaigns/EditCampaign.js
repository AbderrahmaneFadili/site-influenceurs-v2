import React, { Component } from "react";
import { connect } from "react-redux";

class EditCampaign extends Component {
  constructor(porps) {
    this.state = {
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
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Text</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaign);
