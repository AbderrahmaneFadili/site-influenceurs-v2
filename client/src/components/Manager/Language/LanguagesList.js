import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {
  clearError,
  clearMessage,
  getAllLangaugesAction,
} from "../../../redux/actions/langauges.actions";

const LanguagesList = () => {
  const { error, languages, loading, message } = useSelector(
    (state) => state.langaugeReducer
  );

  const dispatch = useDispatch();

  //close success alert
  const closeSuccessAlert = () => dispatch(clearMessage());
  //close error alert
  const closeDangerAlert = () => dispatch(clearError());

  //next page
  const nextPage = (next) => {
    dispatch(getAllLangaugesAction(next, languages.size));
  };

  const handleNextPage = () => {
    if (languages) {
      nextPage(languages.page + 1);
    }
  };
  //previous page
  const previousPage = (previous) => {
    dispatch(getAllLangaugesAction(previous, languages.size));
  };

  const handlePreviousePage = () => {
    if (languages && languages.page > 0) {
      previousPage(languages.page - 1);
    }
  };

  //get all languages by page
  const handlePage = (page) => {
    dispatch(getAllLangaugesAction(page, languages.size));
  };

  return (
    <>
      {message && (
        <Alert variant="success row align-items-center">
          {message}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeSuccessAlert}
          ></i>
        </Alert>
      )}
      {error && (
        <Alert variant="danger row align-items-center">
          {error}
          <i
            className="fas fa-times close-icon ml-auto"
            onClick={closeDangerAlert}
          ></i>
        </Alert>
      )}
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Label</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {languages &&
            languages.data.langues.map((langue) => {
              return (
                <tr key={langue.id.toString()}>
                  <td>{langue.title}</td>
                  <td>
                    <i className="fas fa-pen icon edit mr-2"></i>
                    <i className="fas fa-trash icon remove"></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="row mt-4">
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className="paginate_button page-item previous">
                <span className="page-link" onClick={handlePreviousePage}>
                  Previous
                </span>
              </li>
              {languages &&
                [...Array(languages.data.totalPages).keys()].map((page, i) => {
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
                })}
              <li className="paginate_button page-item next">
                <span className="page-link" onClick={handleNextPage}>
                  Next
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguagesList;
