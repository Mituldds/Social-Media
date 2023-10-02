import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, Tabs } from "antd";
import PhotoComp from "./PhotoComp";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  const items = [
    {
      key: "1",
      label: "Photos",
      children: <PhotoComp />,
    },
    {
      key: "2",
      label: "Videos",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Likes",
      children: "Content of Tab Pane 3",
    },
  ];

  const handleBackBtn = () => {
    navigate("/home");
  };

  return (
    <>
      <div>
        <img className="ProfilePage_imgTop" src="/Images/ProfilePage.png" />
        <div className="Profiel_logo_back">
          <Avatar className="Profile_user_logo">
            {user.email.substring(0, 2).toUpperCase()}
          </Avatar>
          <button className="Profile_back_btn" onClick={handleBackBtn}>
            Back To Home
          </button>
        </div>
        <div className="container mt-3 Profile_Detail">
          <p className="Profile_Detail_P">
            <b>Name : </b>
            {user.name}{" "}
          </p>
          <p className="Profile_Detail_P">
            <b>E-mail : </b>
            {user.email}{" "}
          </p>
          <p className="Profile_Detail_P">
            <b>Number : </b>
            1234567890{" "}
          </p>
        </div>
        <div className="container mt-3 profile_tab">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
