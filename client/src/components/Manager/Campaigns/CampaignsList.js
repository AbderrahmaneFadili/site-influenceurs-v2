import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCampaignsAction } from "../../../redux/actions/campaigns.actions";
import { max_size, page } from "../../../helpers/paginationsParams";
import moment from "moment";

class CampaignsList extends Component {
  nextPage = (next) => {
    this.props.getAllCampaignsAction(next, max_size);
  };

  handleNextPage = () => {
    if (
      this.props.campaigns &&
      this.props.campaigns.currentPage !== this.props.campaigns.totalPages - 1
    ) {
      this.nextPage(this.props.campaigns.currentPage + 1);
    }
  };
  //previous page
  previousPage = (previous) => {
    this.props.getAllCampaignsAction(previous, max_size);
  };

  handlePreviousePage = () => {
    if (this.props.campaigns && this.props.campaigns.currentPage > 0) {
      this.previousPage(this.props.campaigns.currentPage - 1);
    }
  };

  //get all languages by page
  handlePage = (page) => {
    this.props.getAllCampaignsAction(page, max_size);
  };

  componentDidMount() {
    this.props.getAllCampaignsAction(page, max_size);
  }

  //go to details page
  goToDetailsPage = (id) => {
    this.props.history.push(`${this.props.match.path}/details/${id}`);
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
        {this.props.campaigns && this.props.campaigns.campaigns.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>id du client</th>
                <th>titre</th>
                <th>date de début</th>
                <th>date de fin</th>
                <th>présence</th>
                <th>nombre d'influenceurs</th>
                <th>description</th>
                <th>hashtag</th>
                <th>comptes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.campaigns.campaigns.map((campaign) => {
                return (
                  <tr key={campaign.id.toString()}>
                    <td>{campaign.clientId}</td>
                    <td>{campaign.title}</td>
                    <td>{moment(campaign.startDate).format("LL")}</td>
                    <td>{moment(campaign.endDate).format("LL")}</td>
                    <td>{campaign.presence ? "Oui" : "Non"}</td>
                    <td>{campaign.numberInfluencers}</td>
                    <td>{campaign.description}</td>
                    <td>{campaign.hashtage}</td>
                    <td>{campaign.accounts}</td>
                    <td>
                      <i
                        className="fas fa-file-alt details icon"
                        onClick={() => this.goToDetailsPage(campaign.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="my-3">Aucun campagne exists</p>
        )}
        <div className="row mt-4">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {this.props.campaigns &&
                  this.props.campaigns.campaigns.length > 0 && (
                    <>
                      <li className="paginate_button page-item previous">
                        <span
                          className="page-link"
                          onClick={this.handlePreviousePage}
                        >
                          Previous
                        </span>
                      </li>
                      {this.props.campaigns &&
                        [...Array(this.props.campaigns.totalPages).keys()].map(
                          (page, i) => {
                            return (
                              <li
                                key={i.toString()}
                                className={
                                  this.props.campaigns.currentPage === page
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

//map state
const mapStateToProps = (state) => {
  return {
    loading: state.campaignReducer.loading,
    campaigns: state.campaignReducer.campaigns,
  };
};

//map dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCampaignsAction: (page, size) =>
      dispatch(getAllCampaignsAction(page, size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsList);
