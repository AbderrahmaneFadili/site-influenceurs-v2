import React, { useEffect, useState } from "react";
import LanguagesList from "./LanguagesList";
import LanguagesModal from "./LangaugeModal";
import "./Langauge.css";

const Langauge = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Ajouter une langue");

    //handle close
    const handleClose = () => setShow(false);
    //handle show
    const handleShow = () => setShow(true);
    //handle edit
    const toggleTitle = () => {
        setTitle(
            title === "Ajouter une langue"
                ? "Modifier la langue"
                : "Ajouter une langue"
        );
    }


    //get ALl langauges
    const getAllLangauges = () => {
        //   
    }



    //handle add language
    const addLanguage = (langauge) => {

    }

    //handle edit langauge
    const editLangugae = (langauge) => {

    }

    useEffect(() => {
        getAllLangauges();
    }, []);

    return (
        <>
            <div className="container mt-5">
                {/* showing the alerts for success or failure */}
                {/* add button */}
                <div className="mb-2">
                    <button className="btn btn-primary" onClick={handleShow}>
                        Ajouter <i class="fas fa-plus"></i>
                    </button>
                </div>
                {/* List */}
                <LanguagesList />
                {/* Edit & Add Modal */}
                <LanguagesModal show={show} handleClose={handleClose} title={title} />
            </div>
        </>
    );
};

export default Langauge;
