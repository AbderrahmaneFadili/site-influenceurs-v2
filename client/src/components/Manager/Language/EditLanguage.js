import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { isEmpty } from "../../../helpers/formValidation.helpers";

const EditLanguage = () => {
  //* langauge state
  const [language, setLanguage] = useState("");

  //* handle change
  let handleChange = (event) => setLanguage(event.target.value);

  //* form errors
  const [errors, setErrors] = useState([]);
  //*errors messages
  const [errorsMessages, setErrorsMessages] = useState({
    langaugeErrorMessage: "",
  });

  //*has error handle
  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

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
        langaugeErrorMessage: "Ce champ est requis!",
      };
    }

    setErrors(errors);

    setErrorsMessages(errorsMessages);

    if (errors.length === 0) {
    }
  };

  return (
    <>
      <Link to="/manager/dashboard/languages">Retour à la liste</Link>
      <div className="card card-secondary mt-3">
        <div className="card-header">
          <h3 className="card-title">Modifier la langue</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="input-group  has-validation">
              <input
                type="text"
                name="langauge"
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
                {errorsMessages.langaugeErrorMessage &&
                  errorsMessages.langaugeErrorMessage}
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
};

export default EditLanguage;
