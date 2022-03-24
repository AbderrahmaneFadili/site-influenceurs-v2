import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearMessage } from "../../../redux/actions/message.actions";

class AddStudyLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyLevel: "",
      errors: [],
      errorsMessages: {
        studyLevelErrorMessage: "",
      },
    };
  }

  //close success alert
  closeSuccessAlert = () => {};

  //close success alert
  closeErrorAlert = () => {};

  //handle change
  handleChange = (event) => {};

  //handle submit
  handleSubmit = (event) => {};

  render() {
    console.log(this.props);
    return (
      <>
        <Link to="/manager/dashboard/languages">Retour à la liste</Link>
        {this.props.message && (
          <Alert className="mt-3" variant="success row align-items-center">
            {this.props.message}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeSuccessAlert}
            ></i>
          </Alert>
        )}
        {this.props.error && (
          <Alert className="mt-3" variant="danger row align-items-center">
            {this.props.error}
            <i
              className="fas fa-times close-icon ml-auto"
              onClick={this.closeDangerAlert}
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
    message: state.studyLevelReducer.message,
    error: state.studyLevelReducer.error,
    loading: state.studyLevelReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudyLevel);
