import React from "react";
import { Switch, Route } from "react-router-dom";
import ManagerLogin from "./components/Manager/Login/ManagerLogin";
import ManagerRegister from "./components/Manager/Register/ManagerRegister";
import ManagerDashboard from "./components/Manager/Dashboard/ManagerDashboard";
import InfluencerLogin from "./components/Influencer/Login/InfluencerLogin";
import InfluencerRegister from "./components/Influencer/Register/InfluencerRegister";
import RegisterDashboard from "./components/Influencer/Dashboard/InfluencerDashboard";
import "./App.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ManagerLogin} />
        <Route path="/register" component={ManagerRegister} />
        <Route path="/manager/dashboard" component={ManagerDashboard} />
        <Route path="/influencer/login" component={InfluencerLogin} />
        <Route

          path="/influencer/register"
          component={InfluencerRegister}
        />
        <Route

          path="/influencer/dashboard"
          component={RegisterDashboard}
        />
      </Switch>
    </>
  );
};

export default App;
