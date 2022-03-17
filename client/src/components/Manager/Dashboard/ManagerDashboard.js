import React from "react";
import { useRouteMatch } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";

const ManagerDashboard = () => {

  const { url } = useRouteMatch();

  const linksList = [
    {
      to: url + "/campagnes",
      title: 'Campagnes',
      iconClassName: "fas fa-pager nav-icon",
    },
    {
      to: url + "/studylevels",
      title: 'Niveaux d\'étude',
      iconClassName: "fas fa-school nav-icon",
    },
    {
      to: url + "/languages",
      title: 'Langues',
      iconClassName: "fas fa-language nav-icon",
    },
    {
      to: url + "/clients",
      title: 'Clients',
      iconClassName: "fas fa-building nav-icon",
    },
    {
      to: url + "/interests",
      title: 'Centres d\'intérêt',
      iconClassName: "fas fa-heart nav-icon",
    },
  ];


  return (
    <Dashboard links={linksList} dashboardTitle={"Dashboard Administrateur"} />
  );
};

export default ManagerDashboard;
