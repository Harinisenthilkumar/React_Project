import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo .png"; // Ensure the correct path for the logo image
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("Menu");
  const { getTotalCartItems } = useContext(ShopContext); // Correctly using getTotalCartItems

  return (
    <div className="navbar">
      <div className="nav-logo" style={{ position: "relative", left: "-20px" }}>
        <img src={logo} alt="logo" style={{ width: "50px", height: "auto" }} />
        <p>Foodie</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("Menu")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Menu
          </Link>
          {menu === "Menu" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("Vegitarian")}>
          <Link style={{ textDecoration: "none" }} to="/Vegitarian">
            Vegitarian
          </Link>{" "}
          {menu === "Vegitarian" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("Non-Vegitarian")}>
          <Link style={{ textDecoration: "none" }} to="/Non-Vegitarian">
            Non-Vegitarian
          </Link>{" "}
          {menu === "Non-Vegitarian" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("Desserts")}>
          <Link style={{ textDecoration: "none" }} to="/Desserts">
            Desserts{" "}
          </Link>{" "}
          {menu === "Desserts" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link style={{ textDecoration: "none" }} to="/Login">
          <button>Login </button>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
