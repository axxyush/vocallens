import React from "react";
import { Link, useLocation } from "react-router-dom";
import vocallenslogo from "../images/vocallenslogo.png";

function Navbar() {
  let location = useLocation();
  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={vocallenslogo}
              alt="logo"
              style={{
                marginRight: "5px",
                marginBottom: "2px",
                height: "25px",
              }}
              className="fa-solid fa-microphone-lines"
            ></img>
            Vocal Lens
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/upload" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/patient" ? "active" : ""
                    }`}
                    to="/patient"
                  >
                    Patients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/report" ? "active" : ""
                    }`}
                    to="/report"
                  >
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/user" ? "active" : ""
                    }`}
                    to="/user"
                  >
                    <i
                      className="fa-solid fa-user "
                      style={{ marginRight: "5px" }}
                    />
                    Matthew
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
