import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo .png"; // Ensure this file exists
import instagram_icon from "../Assets/instagram_icon.png"; // Ensure this file exists
import pintester_icon from "../Assets/pintester_icon.png"; 
import whatsapp_icon from "../Assets/whatsapp_icon.png"; // Ensure this file exists

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
      </div>
      <ul className="footer-link">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li> {/* Corrected typo from "Offics" */}
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-credit">
        <hr />
        <p>Copyright © 2024 Foodie</p>
      </div>
    </div>
  );
};

export default Footer;
