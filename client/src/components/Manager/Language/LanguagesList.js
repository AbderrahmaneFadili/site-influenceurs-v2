import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  deleteLanguageAction,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";

const LanguagesList = ({ showModal, changeTitleToEdit, setLanguageId }) => {
  const { error, languages, message, loading } = useSelector(
    (state) => state.languageReducer
  );

  const dispatch = useDispatch();

  //next page
  const nextPage = (next) => {
    dispatch(getAlllanguagesAction(next, languages.size));
  };

  const handleNextPage = () => {
    if (
      languages &&
      languages.data.currentPage !== languages.data.totalPages - 1
    ) {
      nextPage(languages.page + 1);
    }
  };
  //previous page
  const previousPage = (previous) => {
    dispatch(getAlllanguagesAction(previous, languages.size));
  };

  const handlePreviousePage = () => {
    if (languages && languages.page > 0) {
      previousPage(languages.page - 1);
    }
  };

  //get all languages by page
  const handlePage = (page) => {
    dispatch(getAlllanguagesAction(page, languages.size));
  };

  const { path } = useRouteMatch();

  const history = useHistory();

  //go to edit page
  const goToEditPage = (id) => {
    history.push(`${path}/edit/${id}`);
  };

  const handleDeleteLanguage = (id) => {
    if (window.confirm("Voulez-vous supprimez cette langue ?")) {
      dispatch(deleteLanguageAction(id))
        .then(() =>
          dispatch(getAlllanguagesAction(languages.data.currentPage, 6))
        )
        .catch((err) => null);
    }
  };

  console.log(languages);
  console.log("message : ", message);
  console.log("error : ", error);

  return (
    <>
      <Link to={`${path}/add`} className="btn btn-primary my-3">
        Ajouter <i className="fas fa-plus"></i>
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Label</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {languages && languages.data.langues.length > 0 ? (
            languages.data.langues.map((langue) => {
              return (
                <tr key={langue.id.toString()}>
                  <td>{langue.title}</td>
                  <td>
                    <i
                      className="fas fa-pen icon edit mr-2"
                      onClick={() => goToEditPage(langue.id)}
                    ></i>
                    <i
                      className="fas fa-trash icon remove"
                      onClick={() => handleDeleteLanguage(langue.id)}
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <p class="my-4">Aucune langues exists</p>
          )}
        </tbody>
      </table>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              {languages && languages.data.langues.length > 0 && (
                <>
                  <li className="paginate_button page-item previous">
                    <span className="page-link" onClick={handlePreviousePage}>
                      Previous
                    </span>
                  </li>
                  {languages &&
                    [...Array(languages.data.totalPages).keys()].map(
                      (page, i) => {
                        return (
                          <li
                            key={i.toString()}
                            className={
                              languages.data.currentPage === page
                                ? "paginate_button page-item active"
                                : "paginate_button page-item"
                            }
                          >
                            <span
                              className="page-link"
                              onClick={(e) => handlePage(page)}
                            >
                              {page + 1}
                            </span>
                          </li>
                        );
                      }
                    )}
                  <li className="paginate_button page-item next">
                    <span className="page-link" onClick={handleNextPage}>
                      Next
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguagesList;
