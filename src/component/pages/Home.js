import React from "react";
import "./Home.css";
import Growth from "./Growth";
import Navbar from "./Navbar";
import Menu from "./Menu";
import AboutUs from "./AboutUs";
import Social from "./Social";
import Resources from "./Resources";
import Chat from "./Chat/Chat";

const Home = () => {
  return (
    <>
      <Navbar />
      <Growth />
      <div className=" row container-fluid ">
        <div className="row">
          <div className="col-md-2 mt-3">
            <Menu />
          </div>
          <div className="social_media col-md-7 ">
            <Social />
            {/* <Chat /> */}
          </div>
          <div className="col-md-3 ">
            <AboutUs />
            <Resources />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
