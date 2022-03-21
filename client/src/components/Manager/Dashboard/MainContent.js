import React from "react";
import { Link } from "react-router-dom";


const MainContent = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">
                    Site <b>Influenceur</b> V2
                </h1>
                <p className="lead">
                    Ici le Dashboard Administrateur
                </p>
                <hr className="my-4" />
                <Link to="" className="btn btn-primary btn-lg" href="dd" role="button">
                    Lire la suite
                </Link>
            </div>
        </div>

    );
};

export default MainContent;
