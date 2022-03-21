import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";

const AddLangaugeModal = ({ show, handleClose, title }) => {

    //* langauge state
    const [language, setLanguage] = useState("");

    //* handle change
    let handleChange = event => setLanguage(event.target.value);


    //* handle submit
    const handleSubmit = event => {
        event.preventDefault();
        //Add Or Edit
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <i className="fas fa-times close-icon" onClick={handleClose}></i>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="langauge"
                            className="form-control"
                            placeholder="Label"
                            onChange={handleChange} />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <i className="fas fa-tag"></i>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success ">Ajouter</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>Annuler</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddLangaugeModal;