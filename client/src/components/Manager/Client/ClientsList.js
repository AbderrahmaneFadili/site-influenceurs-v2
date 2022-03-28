import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { max_size, page } from "../../../helpers/paginationsParams";
import { getAllClientsAction } from "../../../redux/actions/client.actions";

class ClientsList extends Component {
  handleNextPage = () => {
    if (
      this.props.clients &&
      this.props.clients.currentPage !== this.props.clients.totalPages - 1
    ) {
      this.nextPage(this.props.clients.currentPage + 1);
    }
  };
  //previous page
  previousPage = (previous) => {
    this.props.getAllClientsAction(previous, max_size);
  };

  handlePreviousePage = () => {
    if (this.props.clients && this.props.clients.currentPage > 0) {
      this.previousPage(this.props.clients.currentPage - 1);
    }
  };

  //get all languages by page
  handlePage = (page) => {
    this.props.getAllClientsAction(page, max_size);
  };

  componentDidMount() {
    this.props.getAllClientsAction(page, max_size);
  }

  goToEditPage = (id) => {
    this.props.history.push(`${this.props.match.path}/edit/${id}`);
  };

  handleDeleteClient = (id) => {
    if (window.confirm("Voulez-vous supprimez ce client ?")) {
      //  this.props.deleteClientAction(id);
    }
  };

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
        {this.props.clients && this.props.clients.clients.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Entreprise</th>
                <th>Pays</th>
                <th>ville</th>
                <th>Rue</th>
                <th>Directeur</th>
                <th>Tél</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.clients.clients.map((client) => {
                return (
                  <tr key={client.id.toString()}>
                    <td>{client.companyName}</td>
                    <td>{client.country}</td>
                    <td>{client.city}</td>
                    <td>{client.street}</td>
                    <td>{client.directorName}</td>
                    <td>{client.tel}</td>
                    <td>{client.email}</td>
                    <td>
                      <i
                        className="fas fa-pen icon edit mr-2"
                        onClick={() => this.goToEditPage(client.id)}
                      ></i>
                      <i
                        className="fas fa-trash icon remove"
                        onClick={() => this.handleDeleteClient(client.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="my-3">Aucun client exists</p>
        )}
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {this.props.clients && this.props.clients.clients.length > 0 && (
                  <>
                    <li className="paginate_button page-item previous">
                      <span
                        className="page-link"
                        onClick={this.handlePreviousePage}
                      >
                        Previous
                      </span>
                    </li>
                    {this.props.clients &&
                      [...Array(this.props.clients.totalPages).keys()].map(
                        (page, i) => {
                          return (
                            <li
                              key={i.toString()}
                              className={
                                this.props.clients.currentPage === page
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
                      <span className="page-link" onClick={this.handleNextPage}>
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
    clients: state.clientReducer.clients,
    loading: state.clientReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClientsAction: (page, size) =>
      dispatch(getAllClientsAction(page, size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);
