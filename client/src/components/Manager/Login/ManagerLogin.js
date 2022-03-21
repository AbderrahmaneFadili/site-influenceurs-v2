import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import {
  isEmpty,
  isEmailValide,
  isPasswordValide
} from "../../../helpers/formValidation.helpers";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../../redux/actions/auth.actions";

const ManagerLogin = () => {

  //* initial values
  const initialValues = {
    email: "",
    password: "",
  };
  //*form values
  const [formValues, setFormValues] = useState(initialValues);
  //*form errors
  const [errors, setErrors] = useState([]);
  //*errors messages
  const [errorsMessages, setErrorsMessages] = useState({
    emailErrorMessage: "",
    passwordErrorMessage: "",
  });
  //*loading state
  const [loading, setLoading] = useState(false);
  //*histort hooks
  let history = useHistory();
  //*redux hooks
  //*state
  const { isLoggedIn
  } = useSelector(state => state.authReducer);
  const { message } = useSelector(state => state.messageReducer);
  //*dispatch
  const dispatch = useDispatch();


  //*has error handle
  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };


  //*handle value change
  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //*handle submit
  const handleSubmit = event => {
    event.preventDefault();
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};


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


    setErrors(errors);

    setErrorsMessages(errorsMessages);




    if (errors.length === 0) {
      //* set loading to true
      setLoading(true);
      //* login action
      dispatch(authActions.login(formValues.email, formValues.password))
        .then(() => {
          //* rediect to manager dashboard
          history.push("/manager/dashboard");
        })
        .catch(() => {
          setLoading(false);
        });


    } else {
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/manager/dashboard" />
  }

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              Site <b>Influenceur</b> V2
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Connexion au compte administrateur
              </p>
              <form className="mb-5" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
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
                <div className="input-group mb-3">
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
                <div className="row">
                  {/* /.col */}
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm mr-2"></span>
                      )}
                      Envoyé
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="forgot-password.html">j'ai oublié mon mot de passe</a>
              </p>
              <p className="mb-0">
                <NavLink to="/register" className="text-center">
                  S'inscrire
                </NavLink>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerLogin;
