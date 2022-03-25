import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AddInterest from "./AddInterest";
import InterestsList from "./InterestsList";
import EditInterest from "./EditInterest";

class Interest extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="container pt-5">
        <Switch>
          <Route exact path={path} component={InterestsList} />
          <Route exact path={`${path}/add`} component={AddInterest} />
          <Route exact path={`${path}/edit/:id`} component={EditInterest} />
        </Switch>
      </div>
    );
  }
}

export default Interest;
