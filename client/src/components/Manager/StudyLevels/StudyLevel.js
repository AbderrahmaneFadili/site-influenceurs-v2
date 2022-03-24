import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import StudyLevelsList from "./StudyLevelsList";
import AddStudyLevel from "./AddStudyLevel";
import EditStudyLevel from "./EditStudyLevel";

class StudyLevel extends Component {
  render() {
    return (
      <>
        <div className="container pt-5">
          <Switch>
            <Route
              exact
              path={`${this.props.match.path}`}
              component={StudyLevelsList}
            />
            <Route
              exact
              path={`${this.props.match.path}/add`}
              component={AddStudyLevel}
            />
            <Route
              exact
              path={`${this.props.match.path}/edit/:id`}
              component={EditStudyLevel}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default StudyLevel;
