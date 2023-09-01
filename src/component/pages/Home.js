import React from "react";
import "./Home.css";

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

      <div className="card container text-center mt-2">
        <div className="card-body">
          <h5 className="card-title">Growth</h5>
          <p className="card-text">
            Swap tips for finding users and customers.
          </p>
        </div>
        <div className="card-footer text-muted">
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
        </div>
      </div>
    </>
  );
};

export default Home;
