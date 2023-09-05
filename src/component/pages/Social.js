import React from "react";
import "./Social.css";
import { GiStumpRegrowth } from "react-icons/gi";

const Social = () => {
  return (
    <>
      <div className="social_media_card_logo mt-2">
        <img
          className="social_logo col-2"
          src="/Images/pngegg.png"
          alt="logo"
        />{" "}
        <div className="col-7">
          <h5>11 Marketing Channels That Consistently Work for Founders</h5>
          <div>
            <p>Zerotousers</p>
            <span className="text-success">
              <GiStumpRegrowth />
            </span>
            <span>Growth & User Acquisition</span>
          </div>
        </div>
        <div className="btn btn-outline-success col-2 mx-4">Follow</div>
      </div>

      <div className="card">
        <img src="..." class="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};

export default Social;

// 11 Marketing Channels That Consistently Work for Founders
//
//

// March 13, 2021 at 5:16 PM
// 89 Comments
