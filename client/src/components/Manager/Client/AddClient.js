import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  isEmailValide,
  isEmpty,
  isPhoneValide,
} from "../../../helpers/formValidation.helpers";

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //successful
      successful: null,
      //data
      companyName: "",
      country: "",
      city: "",
      street: "",
      directorName: "",
      tel: "",
      email: "",
      //errors
      errors: [],
      //error messages
      errorsMessages: {
        companyNameErrorMessage: "",
        countryErrorMessage: "",
        cityErrorMessage: "",
        streetErrorMessage: "",
        directorNameErrorMessage: "",
        telErrorMessage: "",
        emailMessage: "",
      },
    };
  }

  //handle change
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  //handle submit
  handleSubmit = (event) => {
    event.preventDefault();
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.companyName)) {
      errors.push("companyName");
      errorsMessages = {
        ...errorsMessages,
        companyNameErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(this.state.country)) {
      errors.push("country");
      errorsMessages = {
        ...errorsMessages,
        countryErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(this.state.street)) {
      errors.push("street");
      errorsMessages = {
        ...errorsMessages,
        streetErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(this.state.city)) {
      errors.push("city");
      errorsMessages = {
        ...errorsMessages,
        cityErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(this.state.directorName)) {
      errors.push("directorName");
      errorsMessages = {
        ...errorsMessages,
        directorNameErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(this.state.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Ce champ est requis!",
      };
    } else if (!isEmailValide(this.state.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Email est invalide",
      };
    }

    if (isEmpty(this.state.tel)) {
      errors.push("tel");
      errorsMessages = {
        ...errorsMessages,
        telErrorMessage: "Ce champ est requis!",
      };
    } else if (isPhoneValide(this.state.tel)) {
      errors.push("tel");
      errorsMessages = {
        ...errorsMessages,
        telErrorMessage: "Nombre de telephone est invalide",
      };
    }

    this.setState({
      ...this.state,
      errors: errors,
      errorsMessages: errorsMessages,
    });

    if (errors.length === 0) {
      console.log(this.state);
    }
  };

  render() {
    return (
      <>
        <Link to="/manager/dashboard/clients">Retour à la liste</Link>
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
            <h3 className="card-title">Ajouter un client</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              {/*//* Company Name  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="companyName"
                  className={
                    this.hasError("companyName")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.companyName}
                  placeholder="Nom de l'entreprise"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-building"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("companyName")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.companyNameErrorMessage &&
                    this.state.errorsMessages.companyNameErrorMessage}
                </span>
              </div>
              {/*//* country  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="country"
                  className={
                    this.hasError("country")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.country}
                  placeholder="Pays"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-building"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("country")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.countryErrorMessage &&
                    this.state.errorsMessages.countryErrorMessage}
                </span>
              </div>
              {/*//* City  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="city"
                  className={
                    this.hasError("city")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.city}
                  placeholder="Ville"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-landmark"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("city") ? "error invalid-feedback" : "hidden"
                  }
                >
                  {this.state.errorsMessages.cityErrorMessage &&
                    this.state.errorsMessages.cityErrorMessage}
                </span>
              </div>
              {/*//* directorName  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="directorName"
                  className={
                    this.hasError("directorName")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.directorName}
                  placeholder="Nom du directeur"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-user-tie"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("directorName")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.directorNameErrorMessage &&
                    this.state.errorsMessages.directorNameErrorMessage}
                </span>
              </div>
              {/* //* Street */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="street"
                  className={
                    this.hasError("street")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.street}
                  placeholder="Quartier"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-map-marker"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("street")
                      ? "error invalid-feedback"
                      : "hidden"
                  }
                >
                  {this.state.errorsMessages.streetErrorMessage &&
                    this.state.errorsMessages.streetErrorMessage}
                </span>
              </div>
              {/*//* directorName  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="tel"
                  className={
                    this.hasError("tel")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.tel}
                  placeholder="Téléphone Ex: +212 55-55-555"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-phone"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("tel") ? "error invalid-feedback" : "hidden"
                  }
                >
                  {this.state.errorsMessages.telErrorMessage &&
                    this.state.errorsMessages.telErrorMessage}
                </span>
              </div>
              {/*//* Email  */}
              <div className="input-group  has-validation mb-3">
                <input
                  type="text"
                  name="email"
                  className={
                    this.hasError("email")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={this.state.email}
                  placeholder="E-mail"
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <span
                  className={
                    this.hasError("email") ? "error invalid-feedback" : "hidden"
                  }
                >
                  {this.state.errorsMessages.emailErrorMessage &&
                    this.state.errorsMessages.emailErrorMessage}
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

export default AddClient;
