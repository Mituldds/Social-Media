import React from "react";
import "./Navbar.css";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfilePage = () => {
    navigate("/profile_page");
  };
  const handleLogout = () => {
    navigate("/login");
    toast.success("user successfully logout");
  };
  return (
    <nav className="header navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GSCROLL
        </a>
        <form className="d-flex">
          <div className="header_btn">
            <Avatar
              className="navbar_user_logo"
              style={{
                backgroundColor: "#00a2ae",
                verticalAlign: "middle",
              }}
              size="large"
              onClick={handleProfilePage}
            >
              {user.email.substring(0, 2).toUpperCase()}
            </Avatar>

            <button
              type="button"
              className="signup_button btn btn-success btn-sm mx-3"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
