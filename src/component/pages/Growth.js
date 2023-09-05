import React from "react";
import { TbArrowsJoin } from "react-icons/tb";
import "./Growth.css";

const Growth = () => {
  return (
    <div className="card-body">
      <div className="card mt-3">
        <div className="card_logo mt-2 mx-4">
          <img className="growth_logo" src="/Images/pngegg.png" alt="logo" />{" "}
          <div>
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
          <div className="footer_btn">
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
  );
};

export default Growth;
