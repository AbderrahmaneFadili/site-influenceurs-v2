import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addlanguageAction,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";
import { Alert } from "react-bootstrap";
import { clearMessage } from "../../../redux/actions/message.actions";

function AddLanguage() {
  const { languages } = useSelector((state) => state.languageReducer);
  const { message } = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();

  //close success alert
  const closeAlert = () => {
    dispatch(clearMessage());
    setSeccessful(null);
  };

  //*seccessfuly
  const [seccessful, setSeccessful] = useState(null);

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
      dispatch(addlanguageAction(language))
        .then(() => {
          setLanguage("");
          setSeccessful(true);
          dispatch(getAlllanguagesAction(languages.data.currentPage, 6));
        })
        .catch(() => {
          setSeccessful(false);
        });
    }
  };

  return (
    <>
      <Link to="/manager/dashboard/languages">Retour à la liste</Link>
      {seccessful === true && (
        <Alert className="mt-3  row align-items-center" variant="success">
          {message}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeAlert}
          ></i>
        </Alert>
      )}
      {seccessful === false && (
        <Alert className="mt-3 row align-items-center" variant="danger">
          {message}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeAlert}
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
