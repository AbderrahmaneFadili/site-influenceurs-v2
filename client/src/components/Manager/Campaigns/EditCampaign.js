import React, { Component } from "react";
import { connect } from "react-redux";

class EditCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //handle submit
  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   // errors
  //   const errors = [];
  //   // error messages
  //   let errorsMessages = {};

  //   //validate client
  //   if (isEmpty(this.state.campaign.client)) {
  //     errors.push("client");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       clientErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       clientErrorMessage: "",
  //     };
  //   }
  //   //validate title
  //   if (isEmpty(this.state.campaign.title)) {
  //     errors.push("title");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       titleErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       titleErrorMessage: "",
  //     };
  //   }
  //   //validate start date
  //   if (isEmpty(this.state.campaign.startDate)) {
  //     errors.push("startDate");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       startDateErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       startDateErrorMessage: "",
  //     };
  //   }
  //   //validate end date
  //   if (isEmpty(this.state.campaign.endDate)) {
  //     errors.push("endDate");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       endDateErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       endDateErrorMessage: "",
  //     };
  //   }
  //   //validate presence
  //   if (isEmpty(this.state.campaign.presence)) {
  //     errors.push("presence");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       presenceErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       presenceErrorMessage: "",
  //     };
  //   }
  //   //validate numberInfluencers
  //   if (isEmpty(this.state.campaign.numberInfluencers)) {
  //     errors.push("numberInfluencers");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       numberInfluencersErrorMessage: "Ce champ est requis!",
  //     };
  //   } else if (parseInt(this.state.campaign.numberInfluencers) <= 0) {
  //     errors.push("numberInfluencers");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       numberInfluencersErrorMessage:
  //         "le nombre d'influenceurs doit être supérieur à 0",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       numberInfluencersErrorMessage: "",
  //     };
  //   }

  //   //validate description
  //   if (isEmpty(this.state.campaign.description)) {
  //     errors.push("description");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       descriptionErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       descriptionErrorMessage: "",
  //     };
  //   }

  //   //validate hashtag
  //   if (isEmpty(this.state.campaign.hashtag)) {
  //     errors.push("hashtag");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       hashtagErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       hashtagErrorMessage: "",
  //     };
  //   }

  //   //validate accounts
  //   if (isEmpty(this.state.campaign.accounts)) {
  //     errors.push("accounts");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       accountsErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       accountsErrorMessage: "",
  //     };
  //   }

  //   //validate interests
  //   if (this.state.campaign.interests.length === 0) {
  //     errors.push("interests");
  //     errorsMessages = {
  //       ...errorsMessages,
  //       interestsErrorMessage: "Ce champ est requis!",
  //     };
  //   } else {
  //     errorsMessages = {
  //       ...errorsMessages,
  //       interestsErrorMessage: "",
  //     };
  //   }

  //   this.setState(
  //     (prev) => ({
  //       ...prev,
  //       errors: errors,
  //       errorsMessages: errorsMessages,
  //     }),
  //     () => {
  //       if (this.state.errors.length === 0) {
  //         //edit
  //       }
  //     }
  //   );
  // };

  render() {
    return (
      <>
        <div>
          <h1>Text</h1>
        </div>
      </>
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
