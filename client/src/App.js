import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ManagerLogin from "./components/Manager/Login/ManagerLogin";
import ManagerRegister from "./components/Manager/Register/ManagerRegister";
import ManagerDashboard from "./components/Manager/Dashboard/ManagerDashboard";
import InfluencerLogin from "./components/Influencer/Login/InfluencerLogin";
import InfluencerRegister from "./components/Influencer/Register/InfluencerRegister";
import RegisterDashboard from "./components/Influencer/Dashboard/InfluencerDashboard";
import { useDispatch } from "react-redux";
import { history } from "./helpers/history.helpers";
import { clearMessage as authClearMessage } from "./redux/actions/message.actions";
import { clearMessage as langaugeClearMessage } from "./redux/actions/langauges.actions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //* clear message when changing location
    history.listen((history) => {
      dispatch(authClearMessage());
      dispatch(langaugeClearMessage());
    });
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/" component={ManagerLogin} />
        <Route path="/register" component={ManagerRegister} />
        <Route path="/manager/dashboard" component={ManagerDashboard} />
        <Route path="/influencer/login" component={InfluencerLogin} />
        <Route path="/influencer/register" component={InfluencerRegister} />
        <Route path="/influencer/dashboard" component={RegisterDashboard} />
      </Switch>
    </>
  );
};

export default App;
