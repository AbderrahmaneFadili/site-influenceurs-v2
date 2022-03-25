import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { addInterestAction } from "../../../redux/actions/interest.actions";
import { clearMessage } from "../../../redux/actions/message.actions";

class AddInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: null,
      interest: "",
      errors: [],
      errorsMessages: {
        interestErrorMessage: "",
      },
    };
  }

  //close  alert
  closeAlert = () => {
    this.props.clearMessage();
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  //handle change
  handleChange = (event) => {
    this.setState({
      ...this.state,
      interest: event.target.value,
    });
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  //handle submit
  handleSubmit = (event) => {
    event.preventDefault();

    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.interest)) {
      errors.push("interest");
      errorsMessages = {
        ...errorsMessages,
        interestErrorMessage: "Ce champ est requis!",
      };
    }

    this.setState({
      ...this.state,
      errors: errors,
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
      this.props
        .addInterestAction(this.state.interest)
        .then(() => {
          this.setState({
            ...this.state,
            successful: true,
            interest: "",
          });
        })
        .catch(() => {
          this.setState({
            ...this.state,
            successful: false,
          });
        });
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Link to="/manager/dashboard/interests">Retour à la liste</Link>
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
        <div className="card card-secondary mt-3">
          <div className="card-header">
            <h3 className="card-title">Ajouter un centre d'intérêt</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="input-group  has-validation">
                <input
                  type="text"
                  name="interest"
                  className={
                    this.hasError("interest")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.interest}
                  placeholder="Label"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-tag"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("interest")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.interestErrorMessage &&
                    this.state.errorsMessages.interestErrorMessage}
                </span>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-success">Ajouter</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
    addInterestAction: (interest) => {
      try {
        dispatch(addInterestAction(interest));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInterest);
