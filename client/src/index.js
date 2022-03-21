import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import { history } from "./helpers/history.helpers";


const root = document.querySelector("#root");
ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>

  ,
  root
);
