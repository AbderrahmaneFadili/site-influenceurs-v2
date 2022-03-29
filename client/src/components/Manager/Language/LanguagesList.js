import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { max_size } from "../../../helpers/paginationsParams";
import {
  deleteLanguageAction,
  getAlllanguagesAction,
} from "../../../redux/actions/languages.actions";

const LanguagesList = () => {
  const { error, languages, message } = useSelector(
    (state) => state.languageReducer
  );

  const dispatch = useDispatch();

  //next page
  const nextPage = (next) => {
    dispatch(getAlllanguagesAction(next, max_size));
  };

  const handleNextPage = () => {
    if (languages && languages.currentPage !== languages.totalPages - 1) {
      nextPage(languages.currentPage + 1);
    }
  };
  //previous page
  const previousPage = (previous) => {
    dispatch(getAlllanguagesAction(previous, max_size));
  };

  const handlePreviousePage = () => {
    if (languages && languages.currentPage > 0) {
      previousPage(languages.currentPage - 1);
    }
  };

  //get all languages by page
  const handlePage = (page) => {
    dispatch(getAlllanguagesAction(page, max_size));
  };

  const { path } = useRouteMatch();

  const history = useHistory();

  //go to edit page
  const goToEditPage = (id) => {
    history.push(`${path}/edit/${id}`);
  };

  const handleDeleteLanguage = (id) => {
    if (window.confirm("Voulez-vous supprimez cette langue ?")) {
      dispatch(deleteLanguageAction(id));
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
      {languages && languages.langues.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Label</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {languages.langues.map((langue) => {
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
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucune langues exists</p>
      )}
      <div className="row mt-4">
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              {languages && languages.langues.length > 0 && (
                <>
                  <li className="paginate_button page-item previous">
                    <span className="page-link" onClick={handlePreviousePage}>
                      Previous
                    </span>
                  </li>
                  {languages &&
                    [...Array(languages.totalPages).keys()].map((page, i) => {
                      return (
                        <li
                          key={i.toString()}
                          className={
                            languages.currentPage === page
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
