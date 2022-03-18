import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import validator from "validator";

const ManagerRegister = () => {
  //initial values
  const initialValues = {
    email: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
  };

  //form values
  const [formValues, setFormValues] = useState(initialValues);
  //form errors
  const [errors, setErrors] = useState([]);
  //errors messages
  const [errorsMessages, setErrorsMessages] = useState({
    fullNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    passwordConfirmationErrorMessage: "",
  });

  //handle value change
  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //has error handle
  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    //errors
    const errors = [];
    //error messages
    let errorsMessages = {};

    if (isEmpty(formValues.fullName)) {
      errors.push("fullName");
      errorsMessages = {
        ...errorsMessages,
        fullNameErrorMessage: "Ce champ est requis!",
      };
    }

    if (isEmpty(formValues.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Ce champ est requis!",
      };
    } else if (!isEmailValide(formValues.email)) {
      errors.push("email");
      errorsMessages = {
        ...errorsMessages,
        emailErrorMessage: "Ceci n'est pas un e-mail valide.",
      };
    }

    if (isEmpty(formValues.password)) {
      errors.push("password");
      errorsMessages = {
        ...errorsMessages,
        passwordErrorMessage: "Ce champ est requis!",
      };
    } else if (!isPasswordValide(formValues.password)) {
      errors.push("password");
      errorsMessages = {
        ...errorsMessages,
        passwordErrorMessage: "le mot de passe doit comporter au moins 8 caractères",
      };
    }

    if (isEmpty(formValues.passwordConfirmation)) {
      errors.push("passwordConfirmation");
      errorsMessages = {
        ...errorsMessages,
        passwordConfirmationErrorMessage: "Ce champ est requis!",
      };
    } else if (!isPasswordConfirmed()) {
      errors.push("passwordConfirmation");
      errorsMessages = {
        ...errorsMessages,
        passwordConfirmationErrorMessage: "le mot de passe n'est pas confirmé",
      };
    }

    setErrors(errors);

    setErrorsMessages(errorsMessages);

    if (!errors.length > 0) {
      console.log(formValues);
      console.log(errors);
    } else {
      console.log(errors);
    }
  };

  //check if is empty
  const isEmpty = (field) => {
    return validator.isEmpty(field);
  };

  //check if the email is valide
  const isEmailValide = (value) => {
    return validator.isEmail(value);
  };

  //check if the password is valide
  const isPasswordValide = (value) => {
    return value.length === 8
  };

  //check the password confirmation
  const isPasswordConfirmed = () => {
    return (
      formValues.password === formValues.passwordConfirmation
    );
  };

  return (
    <>
      <div className="register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="/">
              Site <b>Influenceur</b> V2
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Inscrivez-vous</p>
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group mb-3 has-validation">
                  <input
                    type="text"
                    className={
                      hasError("fullName")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="fullName"
                    placeholder="nom et prénom"
                    value={formValues.fullName}
                    onChange={handleValueChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                  <span
                    className={
                      hasError("fullName") ? "error invalid-feedback" : "hidden"
                    }
                  >
                    {errorsMessages.fullNameErrorMessage && errorsMessages.fullNameErrorMessage}
                  </span>
                </div>

                <div className="input-group mb-3 has-validation">
                  <input
                    type="text"
                    className={
                      hasError("email")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="email"
                    placeholder="E-mail"
                    value={formValues.email}
                    onChange={handleValueChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                  <span
                    className={
                      hasError("email") ? "error invalid-feedback" : "hidden"
                    }
                  >
                    {errorsMessages.emailErrorMessage && errorsMessages.emailErrorMessage}
                  </span>
                </div>

                <div className="input-group mb-3 has-validation">
                  <input
                    type="password"
                    className={
                      hasError("password")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="password"
                    placeholder="Mot de passe"
                    value={formValues.password}
                    onChange={handleValueChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                  <span
                    className={
                      hasError("password") ? "error invalid-feedback" : "hidden"
                    }
                  >
                    {errorsMessages.passwordErrorMessage && errorsMessages.passwordErrorMessage}
                  </span>
                </div>

                <div className="input-group mb-3 has-validation">
                  <input
                    type="password"
                    className={
                      hasError("passwordConfirmation")
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="passwordConfirmation"
                    placeholder="Confirmez le mot de passe"
                    value={formValues.passwordConfirmation}
                    onChange={handleValueChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                  <span
                    className={
                      hasError("passwordConfirmation") ? "error invalid-feedback" : "hidden"
                    }
                  >
                    {errorsMessages.passwordConfirmationErrorMessage && errorsMessages.passwordConfirmationErrorMessage}
                  </span>
                </div>

                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block">
                      Inscrire
                    </button>
                  </div>
                </div>
              </form>
              <NavLink to="/" className="text-center">
                J'ai déjà un compte
              </NavLink>
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
      </div>
    </>
  );
};

export default ManagerRegister;
