import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteStudyLevelAction,
  getAllStudyLevelsAction,
} from "../../../redux/actions/studylevel.actions";
import { max_size, page } from "../../../helpers/paginationsParams";

class StudyLevelsList extends Component {
  //get all study levels
  getAllStudyLevels = (page, size) => {
    this.props.getAllStudyLevelsAction(page, size);
  };

  //next page
  nextPage = (next) => {
    this.props.getAllStudyLevelsAction(next, max_size);
  };

  handleNextPage = () => {
    if (
      this.props.studyLevels &&
      this.props.studyLevels.currentPage !==
        this.props.studyLevels.totalPages - 1
    ) {
      this.nextPage(this.props.studyLevels.currentPage + 1);
    }
  };
  //previous page
  previousPage = (previous) => {
    this.props.getAllStudyLevelsAction(previous, max_size);
  };

  handlePreviousePage = () => {
    if (this.props.studyLevels && this.props.studyLevels.currentPage > 0) {
      this.previousPage(this.props.studyLevels.currentPage - 1);
    }
  };

  //get all languages by page
  handlePage = (page) => {
    this.props.getAllStudyLevelsAction(page, max_size);
  };

  componentDidMount() {
    this.getAllStudyLevels(page, max_size);
  }

  goToEditPage = (id) => {
    this.props.history.push(`${this.props.match.path}/edit/${id}`);
  };

  handleDeleteLanguage = (id) => {
    if (window.confirm("Voulez-vous supprimez cet niveau d'étude ?")) {
      this.props.deleteStudyLevelAction(id);
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Link
          to={`${this.props.match.path}/add`}
          className="btn btn-primary mb-3"
        >
          Ajouter <i className="fas fa-plus"></i>
        </Link>
        {this.props.studyLevels &&
        this.props.studyLevels.studyLevels.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Label</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.studyLevels.studyLevels.map((studyLevel) => {
                return (
                  <tr key={studyLevel.id.toString()}>
                    <td>{studyLevel.title}</td>
                    <td>
                      <i
                        className="fas fa-pen icon edit mr-2"
                        onClick={() => this.goToEditPage(studyLevel.id)}
                      ></i>
                      <i
                        className="fas fa-trash icon remove"
                        onClick={() => this.handleDeleteLanguage(studyLevel.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="my-3">Aucune niveau d'êtudes exists</p>
        )}
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {this.props.studyLevels &&
                  this.props.studyLevels.studyLevels.length > 0 && (
                    <>
                      <li className="paginate_button page-item previous">
                        <span
                          className="page-link"
                          onClick={this.handlePreviousePage}
                        >
                          Previous
                        </span>
                      </li>
                      {this.props.studyLevels &&
                        [
                          ...Array(this.props.studyLevels.totalPages).keys(),
                        ].map((page, i) => {
                          return (
                            <li
                              key={i.toString()}
                              className={
                                this.props.studyLevels.currentPage === page
                                  ? "paginate_button page-item active"
                                  : "paginate_button page-item"
                              }
                            >
                              <span
                                className="page-link"
                                onClick={(e) => this.handlePage(page)}
                              >
                                {page + 1}
                              </span>
                            </li>
                          );
                        })}
                      <li className="paginate_button page-item next">
                        <span
                          className="page-link"
                          onClick={this.handleNextPage}
                        >
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
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.studyLevelReducer.loading,
    studyLevels: state.studyLevelReducer.studyLevels,
  };
};

const mapStateToDipatch = (dispatch) => {
  return {
    getAllStudyLevelsAction: (page, size) =>
      dispatch(getAllStudyLevelsAction(page, size)),
    deleteStudyLevelAction: (id) => {
      dispatch(deleteStudyLevelAction(id));
    },
  };
};

export default connect(mapStateToProps, mapStateToDipatch)(StudyLevelsList);
