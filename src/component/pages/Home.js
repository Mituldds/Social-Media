import React from "react";
import "./Home.css";
import Growth from "./Growth";
import Navbar from "./Navbar";
import Menu from "./Menu";
import AboutUs from "./AboutUs";
import Social from "./Social";
import Resources from "./Resources";

const Home = () => {
  return (
    <>
      <Navbar />
      <Growth />
      <div className=" row container-fluid ">
        <div className="row">
          <div className="col-md-2 mt-2">
            <Menu />
          </div>
          <div className="col-md-7 ">
            <Social />
          </div>
          <div className="col-md-3 mt-2">
            <AboutUs />
            <Resources />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
