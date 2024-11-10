import React, { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    console.log("Attempting to log in with:", formData);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) throw new Error("Failed to log in.");

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.href = "/"; // Redirects to the home page
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const signup = async () => {
    console.log("Attempting to sign up with:", formData);
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to sign up.");

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.href = "/"; // Redirects to the home page
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="loginSignup">
      <div className="loginsignip-container">
        <h1>{state === "Sign Up" ? "SIGN UP" : "LOGIN"}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="name"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button onClick={() => (state === "Login" ? login() : signup())}>
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <p className="loginsignup-login">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("Login")}>Login Here</span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span onClick={() => setState("Sign Up")}>Sign Up Here</span>
            </>
          )}
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" required />
          <p> By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
