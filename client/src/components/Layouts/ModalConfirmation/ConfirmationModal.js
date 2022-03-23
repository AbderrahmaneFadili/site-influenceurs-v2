import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const ConfirmationModal = ({ show, title, body, handleClose, action }) => {
  const dispatch = useDispatch();

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <i className="fas fa-times close-icon" onClick={handleClose}></i>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={handleClose}>
          Oui
        </button>
        <button className="btn btn-secondary" onClick={handleClose}>
          Non
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
