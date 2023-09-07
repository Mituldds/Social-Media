import React, { useState } from "react";
import { TbArrowsJoin } from "react-icons/tb";
import "./Growth.css";
import Popup from "./Popup.js";
const Growth = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewPost = () => {};
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
              onClick={handleShow}
              // onClick={addNewPost}
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
      <Popup show={show} handleClose={handleClose} />
    </div>
  );
};

export default Growth;
