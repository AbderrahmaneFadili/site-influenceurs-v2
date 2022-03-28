import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  isEmailValide,
  isEmpty,
  isPhoneValide,
} from "../../../helpers/formValidation.helpers";
import { connect } from "react-redux";
import { findClientAction } from "../../../redux/actions/client.actions";
import { clearMessage } from "../../../redux/actions/message.actions";
import { isEqual } from "lodash";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //successful
      successful: null,
      //data
      client: {
        companyName: "",
        country: "",
        city: "",
        street: "",
        directorName: "",
        tel: "",
        email: "",
      },
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
      client: {
        [name]: value,
      },
    });
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  //handle close alert
  closeAlert = () => {
    this.props.clearMessage();
    this.setState({
      ...this.state,
      successful: null,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.client, this.props.client)) {
      this.setState({
        ...this.state,
        client: {
          companyName:
            nextProps.client !== null
              ? nextProps.client.companyName
              : this.state.client.companyName,
          country:
            nextProps.client !== null
              ? nextProps.client.country
              : this.state.client.country,
          city:
            nextProps.client !== null
              ? nextProps.client.city
              : this.state.client.city,
          street:
            nextProps.client !== null
              ? nextProps.client.street
              : this.state.client.street,
          directorName:
            nextProps.client !== null
              ? nextProps.client.directorName
              : this.state.client.directorName,
          tel:
            nextProps.client !== null
              ? nextProps.client.tel
              : this.state.client.tel,
          email:
            nextProps.client !== null
              ? nextProps.client.email
              : this.state.client.email,
        },
      });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.findClientAction(id);
  }

  //handle submit
  handleSubmit = (event) => {
    event.preventDefault();
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(this.state.client.companyName)) {
      errors.push("companyName");
      errorsMessages = {
        ...errorsMessages,
        companyNameErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        companyNameErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.country)) {
      errors.push("country");
      errorsMessages = {
        ...errorsMessages,
        countryErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        countryErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.street)) {
      errors.push("street");
      errorsMessages = {
        ...errorsMessages,
        streetErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        streetErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.city)) {
      errors.push("city");
      errorsMessages = {
        ...errorsMessages,
        cityErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        cityErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.directorName)) {
      errors.push("directorName");
      errorsMessages = {
        ...errorsMessages,
        directorNameErrorMessage: "Ce champ est requis!",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        directorNameErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Ce champ est requis!",
      };
    } else if (!isEmailValide(this.state.client.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Email est invalide",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "",
      };
    }

    if (isEmpty(this.state.client.tel)) {
      errors.push("tel");
      errorsMessages = {
        ...errorsMessages,
        telErrorMessage: "Ce champ est requis!",
      };
    } else if (isPhoneValide(this.state.client.tel)) {
      errors.push("tel");
      errorsMessages = {
        ...errorsMessages,
        telErrorMessage: "Nombre de telephone est invalide",
      };
    } else {
      errorsMessages = {
        ...errorsMessages,
        telErrorMessage: "",
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
        }
      }
    );
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
            <h3 className="card-title">Modifier le client</h3>
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
                  value={this.state.client.companyName}
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
                  value={this.state.client.country}
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
                  value={this.state.client.city}
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
                  value={this.state.client.directorName}
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
                  value={this.state.client.street}
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
                  value={this.state.client.tel}
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
                  value={this.state.client.email}
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

const mapStateToProps = (state) => {
  return {
    loading: state.clientReducer.loading,
    message: state.messageReducer.message,
    client: state.clientReducer.client,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
    findClientAction: (id) => dispatch(findClientAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);
