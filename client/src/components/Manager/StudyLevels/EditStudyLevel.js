import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../../redux/actions/message.actions";

class EditStudyLevel extends Component {
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

  handleChange = (event) => {};

  //* has error handle
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //* Add Or Edit
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.studyLevel)) {
      errors.push("studyLevel");
      errorsMessages = {
        ...errorsMessages,
        studyLevelErrorMessage: "Ce champ est requis!",
      };
    }

    this.setState({
      ...this.state,
      errors: errors,
      errorsMessages: errorsMessages,
    });

    if (this.state.errors.length > 0) {
    }
  };

  render() {
    return (
      <>
        <Link to="/manager/dashboard/studyLevels">Retour à la liste</Link>
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
            <h3 className="card-title">Modifier la langue</h3>
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
                  value={this.state.studyLevel}
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
                  {this.state.errorsMessages.studyLevelErrorMessage &&
                    this.state.errorsMessages.studyLevelErrorMessage}
                </span>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-success">Modifier</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EditStudyLevel;
