import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { useRouteMatch } from "react-router-dom";
import Content from "../Content/Content";




const Dashboard = ({ links, dashboardTitle }) => {
  let { path } = useRouteMatch();

  const pages = [
    {
      path: path + "/campagnes",
      page: () => <h1>Campagnes</h1>
    },
    {
      path: path + "/studylevels",
      page: () => <h1>Niveaux d\'étude</h1>
    },
    {
      path: path + "/languages",
      page: () => <h1>Langues</h1>
    },
    {
      path: path + "/clients",
      page: () => <h1>Clients</h1>
    },
    {
      path: path + "/interests",
      page: () => <h1>Centres d\'intérêt</h1>
    },
  ];
  return (
    <>
      {/* Navbar */}
      <Navbar title={dashboardTitle} />
      {/* Sidebar */}
      <SideBar links={links} />
      {/* Content */}
      <Content pages={pages} />
    </>
  );
};



export default Dashboard;
