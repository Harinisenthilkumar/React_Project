import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      {" "}
      {/* Wrap with the gradient container */}
      <div className="newsletter">
        <h1>Get Exclusive Offers On Your E-Mail</h1>
        <p>Follow our NewsLetter and stay Updated</p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your Email"
            className="email-input"
          />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
