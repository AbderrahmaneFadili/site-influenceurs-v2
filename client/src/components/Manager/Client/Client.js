import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AddClient from "./AddClient";
import ClientsList from "./ClientsList";
import EditClient from "./EditClient";

class Client extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="container pt-5">
        <Switch>
          <Route exact path={`${path}`} component={ClientsList} />
          <Route exact path={`${path}/add`} component={AddClient} />
          <Route exact path={`${path}/edit/:id`} component={EditClient} />
        </Switch>
      </div>
    );
  }
}

export default Client;
