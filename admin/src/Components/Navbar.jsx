import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo .png";
import Nav_logo from "../Assets/Nav_logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="nav-logo" />
      </div>
      <div className="navbar-title">
        <h1>Admin Panel</h1>
        <h4>Foddie</h4>
      </div>
      <div className="navbar-profile">
        <img src={Nav_logo} alt="nav-profile" />
      </div>
    </div>
  );
};

export default Navbar;
