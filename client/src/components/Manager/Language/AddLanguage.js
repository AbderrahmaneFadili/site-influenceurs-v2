import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addlanguageAction,
  clearError,
  clearMessage,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";
import { Alert } from "react-bootstrap";

function AddLanguage() {
  const { message, error, languages } = useSelector(
    (state) => state.languageReducer
  );

  const dispatch = useDispatch();

  //close success alert
  const closeSuccessAlert = () => dispatch(clearMessage());
  //close error alert
  const closeDangerAlert = () => dispatch(clearError());

  //* language state
  const [language, setLanguage] = useState("");

  //* handle change
  let handleChange = (event) => setLanguage(event.target.value);

  //* form errors
  const [errors, setErrors] = useState([]);
  //*errors messages
  const [errorsMessages, setErrorsMessages] = useState({
    languageErrorMessage: "",
  });

  //*has error handle
  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const history = useHistory();

  //* handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    //* Add Or Edit
    //*errors
    const errors = [];
    //*error messages
    let errorsMessages = {};

    if (isEmpty(language)) {
      errors.push("language");
      errorsMessages = {
        ...errorsMessages,
        languageErrorMessage: "Ce champ est requis!",
      };
    }

    setErrors(errors);

    setErrorsMessages(errorsMessages);

    if (errors.length === 0) {
      dispatch(addlanguageAction(language)).then(() => {
        setLanguage("");
        dispatch(getAlllanguagesAction(languages.data.currentPage, 6));
      });
    }
  };

  return (
    <>
      <Link to="/manager/dashboard/languages">Retour à la liste</Link>
      {message && (
        <Alert className="mt-3" variant="success row align-items-center">
          {message}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeSuccessAlert}
          ></i>
        </Alert>
      )}
      {error && (
        <Alert className="mt-3" variant="danger row align-items-center">
          {error}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeDangerAlert}
          ></i>
        </Alert>
      )}
      <div className="card card-secondary mt-3">
        <div className="card-header">
          <h3 className="card-title">Ajouter une langue</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="input-group  has-validation">
              <input
                type="text"
                name="language"
                className={
                  hasError("language")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                value={language}
                placeholder="Label"
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <i className="fas fa-tag"></i>
                </div>
              </div>
              <span
                className={
                  hasError("language") ? "error invalid-feedback" : "hidden"
                }
              >
                {errorsMessages.languageErrorMessage &&
                  errorsMessages.languageErrorMessage}
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

export default AddLanguage;
