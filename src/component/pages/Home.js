import React from "react";
import "./Home.css";
import { TbArrowsJoin } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineWechat } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { RxButton } from "react-icons/rx";
import { ImProfile } from "react-icons/im";

const Home = () => {
  return (
    <>
      <nav className="header navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            GSCROLL
          </a>

          <form className="d-flex">
            <div className="header_btn">
              <button
                type="button"
                className="login_button btn btn-outline-success btn-sm "
              >
                Login
              </button>
              <button
                type="button"
                className="signup_button btn btn-success btn-sm mx-3"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </nav>

      <div className="card-body">
        <div className="card mt-3">
          <div className="card_logo container">
            <img className="growth_logo" src="/Images/pngegg.png" alt="logo" />{" "}
            <div className="container">
              <h4 className="card-title ">Growth</h4>
              <p className="card-text">
                Swap tips for finding users and customers.
              </p>
            </div>
          </div>
          <div
            className="card-footer container-fluid mt-3"
            style={{ backgroundColor: "rgba(46, 125, 50, 0.2)" }}
          >
            <div className="header_btn">
              <button
                type="button"
                className="login_button btn btn-outline-success btn-sm"
              >
                New Post
              </button>
              <button
                type="button"
                className="signup_button btn btn-success btn-sm mx-3"
              >
                Join Group <TbArrowsJoin />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card col-2 menu_card">
          <h5 className="mt-2 mx-3">Menu</h5>
          <ul className="card_list">
            <li>
              <span>
                <FaHome />
              </span>{" "}
              Home
            </li>
            <li>
              <span>
                <CgSearchFound />
              </span>
              Search
            </li>
            <li>
              {" "}
              <span>
                <AiOutlineWechat />
              </span>
              Chat
            </li>
            <li>
              {" "}
              <span>
                <IoIosNotifications />
              </span>
              Notification
            </li>
            <li>
              {" "}
              <span>
                <FaHashtag />
              </span>
              Trending
            </li>
            <li>
              {" "}
              <span>
                <GiDiscussion />
              </span>
              Comunities
            </li>
            <li>
              {" "}
              <span>
                <RxButton />
              </span>
              Turn On Light
            </li>
            <li>
              {" "}
              <span>
                <ImProfile />
              </span>
              Profile
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
