import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
