import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = document.querySelector("#root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root
);
