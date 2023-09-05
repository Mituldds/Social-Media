import React from "react";
import "./Home.css";
import Growth from "./Growth";
import Navbar from "./Navbar";
import Menu from "./Menu";
import AboutUs from "./AboutUs";
import Social from "./Social";

const Home = () => {
  return (
    <>
      <Navbar />
      <Growth />

      <div className=" row container-fluid mt-3">
        <div className="row">
          <div className="col-md-2">
            <Menu />
          </div>
          <div className="col-md-7 ">
            <Social />
          </div>
          <div className="col-md-3">
            <AboutUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
