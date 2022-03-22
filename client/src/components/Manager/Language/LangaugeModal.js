import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "../../../helpers/formValidation.helpers";

const AddLangaugeModal = ({
  show,
  handleClose,
  title,
  addLanguage,
  editLangugae,
}) => {
  //* langauge state
  const [language, setLanguage] = useState("");

  //* handle change
  let handleChange = (event) => setLanguage(event.target.value);
  //*form errors
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
      if (title === "Ajouter une langue") {
        addLanguage(language);
        setLanguage("");
        handleClose();
      } else {
        editLangugae(language);
      }
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <i className="fas fa-times close-icon" onClick={handleClose}></i>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 has-validation">
            <input
              type="text"
              name="langauge"
              className={
                hasError("language")
                  ? "form-control is-invalid"
                  : "form-control"
              }
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
          <button className="btn btn-success">Ajouter</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Annuler
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLangaugeModal;
