import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { Route, Switch, useRouteMatch } from "react-router-dom";




const Dashboard = () => {
  let { path } = useRouteMatch();
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Sidebar */}
      <SideBar />
      {/* Content */}
      <div className="content-wrapper">
        <Switch>
          <Route exact path={path} render={() => <h1>Dashboard</h1>} />
          <Route path={`${path}/page1`} component={Page1} />
          <Route path={`${path}/page2`} component={Page2} />
        </Switch>
      </div>
    </>
  );
};


const Page1 = () => {

  return (
    <div>
      <h1>Page 1</h1>
    </div>
  );
}

const Page2 = () => {

  return (
    <div>
      <h1>Page 2</h1>
    </div>
  );
}

export default Dashboard;
