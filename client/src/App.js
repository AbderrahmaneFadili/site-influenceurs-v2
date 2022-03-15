import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div className="container">
        <h1>Count : {this.state.count}</h1>
        <button
          className="btn btn-success"
          onClick={() =>
            this.setState({
              count: this.state.count + 1,
            })
          }
        ></button>
      </div>
    );
  }
}

export default App;
