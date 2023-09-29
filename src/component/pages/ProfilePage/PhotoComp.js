import React from "react";
import { Avatar } from "antd";
import "./PhotoComp.css";

const PhotoComp = () => {
  return (
    <>
      <div className="container User_Logo">
        <Avatar className="User_Post_upload"></Avatar>
        <p className="Profile_Detail_P">
          <b>Name:</b>
          <span>Alison Jordon Parker</span>{" "}
        </p>
      </div>
    </>
  );
};

export default PhotoComp;
