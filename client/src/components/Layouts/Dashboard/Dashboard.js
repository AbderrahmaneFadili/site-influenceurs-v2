import React from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import Content from "../Content/Content";




const Dashboard = ({ links, dashboardTitle, pages }) => {


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
