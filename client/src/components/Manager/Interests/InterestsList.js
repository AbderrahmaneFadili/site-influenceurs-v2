import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllInterestsAction } from "../../../redux/actions/interest.actions";
import { max_size, page } from "../../../helpers/paginationsParams";

class InterestsList extends Component {
  //next page
  nextPage = (next) => {
    this.props.getAllInterestsAction(next, max_size);
  };

  handleNextPage = () => {
    if (
      this.props.interests &&
      this.props.interests.currentPage !== this.props.interests.totalPages - 1
    ) {
      this.nextPage(this.props.interests.currentPage + 1);
    }
  };
  //previous page
  previousPage = (previous) => {
    this.props.getAllInterestsAction(previous, max_size);
  };

  handlePreviousePage = () => {
    if (this.props.interests && this.props.interests.currentPage > 0) {
      this.previousPage(this.props.interests.currentPage - 1);
    }
  };

  //get all languages by page
  handlePage = (page) => {
    this.props.getAllInterestsAction(page, max_size);
  };

  componentDidMount() {
    this.props.getAllInterestsAction(page, max_size);
  }

  goToEditPage = (id) => {
    this.props.history.push(`${this.props.match.path}/edit/${id}`);
  };

  handleDeleteInterest = (id) => {};

  render() {
    console.log(this.props);
    return (
      <>
        <Link
          to={`${this.props.match.path}/add`}
          className="btn btn-primary my-3"
        >
          Ajouter <i className="fas fa-plus"></i>
        </Link>
        {this.props.interests && this.props.interests.interests.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Label</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.interests.interests.map((interest) => {
                return (
                  <tr key={interest.id.toString()}>
                    <td>{interest.title}</td>
                    <td>
                      <i
                        className="fas fa-pen icon edit mr-2"
                        onClick={() => this.goToEditPage(interest.id)}
                      ></i>
                      <i
                        className="fas fa-trash icon remove"
                        onClick={() => this.handleDeleteInterest(interest.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="my-3">Aucune centre d'interet exists</p>
        )}
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {this.props.interests &&
                  this.props.interests.interests.length > 0 && (
                    <>
                      <li className="paginate_button page-item previous">
                        <span
                          className="page-link"
                          onClick={this.handlePreviousePage}
                        >
                          Previous
                        </span>
                      </li>
                      {this.props.interests &&
                        [...Array(this.props.interests.totalPages).keys()].map(
                          (page, i) => {
                            return (
                              <li
                                key={i.toString()}
                                className={
                                  this.props.interests.currentPage === page
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
                          }
                        )}
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
    loading: state.interestReducer.loading,
    interests: state.interestReducer.interests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInterestsAction: (page, size) =>
      dispatch(getAllInterestsAction(page, size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestsList);
