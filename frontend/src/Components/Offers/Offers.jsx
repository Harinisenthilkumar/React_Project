import React from "react";
import "./Offers.css";
import food_free_image from "../Assets/Food-Free.png"

const Offers = () => {
  return (
    <div className="offers-container">
      <div className="offers">
        <div className="offers-left">
          <h1>Exclusive Deal Just for You!</h1>
          <p>
            Get 20% off on your first order. Treat yourself to our delicious
            meals and enjoy a delightful experience.
          </p>
          <button>Order Now</button>
        </div>
        <div className="offers-right">
          <img src={food_free_image} alt="Delicious Food Offer" />
        </div>
      </div>
    </div>
  );
};

export default Offers;
