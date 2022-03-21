import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Content from "../Content/Content";


const Dashboard = ({ links, dashboardTitle, pages, dashboardPath, dashboardComponent, curreentUser }) => {
  return (
    <>
      {/* Navbar */}
      <Navbar title={dashboardTitle} curreentUser={curreentUser} />
      {/* Sidebar */}
      <SideBar links={links} />
      {/* Content */}
      <Content pages={pages} dashboardPath={dashboardPath} dashboardComponent={dashboardComponent} />
    </>
  );
};



export default Dashboard;
