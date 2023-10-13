import React from "react";
import "./Home.css";
import Growth from "./Growth";
import Navbar from "./Navbar";
import Menu from "./Menu";
import AboutUs from "./AboutUs";
import Resources from "./Resources";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <Growth />
      <div className="Home">
        <div className="menu_container">
          <Menu />
        </div>
        <div className="social_media">
          <Outlet />
        </div>
        <div className="resourses_container">
          <AboutUs />
          <Resources />
        </div>
      </div>
    </>
  );
};

export default Home;
