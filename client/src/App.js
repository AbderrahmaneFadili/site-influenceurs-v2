import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBare";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <Footer />
      </>
    );
  }
}

export default App;
