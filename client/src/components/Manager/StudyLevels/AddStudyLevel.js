import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { clearMessage } from "../../../redux/actions/message.actions";

class AddStudyLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: null,
      studyLevel: "",
      errors: [],
      errorsMessages: {
        studyLevelErrorMessage: "",
      },
    };
  }

  //close success alert
  closeAlert = () => {
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  //handle change
  handleChange = (event) => {};

  //handle submit
  handleSubmit = (event) => {
    event.preventDefault();

    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.studyLevel)) {
      errors.push("language");
      errorsMessages = {
        ...errorsMessages,
        studyLevelErrorMessage: "Ce champ est requis!",
      };
    }
    this.setState({
      ...this.state,
      errors: errors,
    });

    this.setState({
      ...this.state,
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Link to="/manager/dashboard/languages">Retour à la liste</Link>
        {this.props.message && (
          <Alert className="mt-3 row align-items-center" variant="success">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeAlert}
            ></i>
          </Alert>
        )}
        {this.props.error && (
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
            <h3 className="card-title">Ajouter une langue</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="input-group  has-validation">
                <input
                  type="text"
                  name="studyLevel"
                  className={
                    this.hasError("studyLevel")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={""}
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
                    this.hasError("studyLevel")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.errorsMessages.studyLevelErrorMessage &&
                    this.errorsMessages.studyLevelErrorMessage}
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
    loading: state.studyLevelReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudyLevel);
