import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCampaignsAction } from "../../../redux/actions/campaigns.actions";
import { max_size, page } from "../../../helpers/paginationsParams";

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

  render() {
    return (
      <>
        <Link
          to={`${this.props.match.path}/add`}
          className="btn btn-primary my-3"
        >
          Ajouter <i className="fas fa-plus"></i>
        </Link>
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
