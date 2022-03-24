import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllStudyLevelsAction } from "../../../redux/actions/studylevel.actions";

class StudyLevelsList extends Component {
  //get all study levels
  getAllStudyLevels = (page, size) => {
    this.props.getAllStudyLevelsAction(page, size);
  };

  componentDidMount() {
    this.getAllStudyLevels(0, 6);
  }

  goToEditPage = (id) => {
    this.props.history.push(
      `${this.props.match.path}/edit/${this.props.match.params.id}`
    );
  };

  handleDeleteLanguage = (id) => {};

  render() {
    console.log(this.props);
    return (
      <>
        <Link to={`${this.props.match.path}/add`} className="btn btn-primary">
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
            {this.props.studyLevels && this.props.studyLevels.length > 0 ? (
              this.props.studyLevels.map((studyLevel) => {
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
              })
            ) : (
              <p class="my-4">Aucune langues exists</p>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.studyLevelReducer.loading,
    studyLevels: state.studyLevelReducer.studyLevels,
    error: state.studyLevelReducer.error,
  };
};

const mapStateToDipatch = (dispatch) => {
  return {
    getAllStudyLevelsAction: (page, size) =>
      dispatch(getAllStudyLevelsAction(page, size)),
  };
};

export default connect(mapStateToProps, mapStateToDipatch)(StudyLevelsList);
