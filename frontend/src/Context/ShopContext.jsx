import React, { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0; // Initialize each product in the cart with a quantity of 0
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.text())
        .then((data) => console.log(data));// logout panitu same mail pass potu same id la thana login panan but and count varala bro 
        // last ah nan pana 2 products , wait check pannanum

    }
  };

  // const addToCart = (itemId) => {
  //   const token = localStorage.getItem("auth-token");

  //   if (!token) {
  //     console.log("No token found. Please log in.");
  //     return; // Stop execution if no token is found
  //   }

  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  //   fetch("http://localhost:4000/addtocart", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "auth-token": `${token}`, // Make sure the token is passed here
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ itemId: itemId }), // Sending itemId to backend
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Item added to cart:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding item to cart:", error);
  //     });
  // };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removeFromCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      } // try now
    }
    console.log("totalItem", totalItem);
    return totalItem;
  };

  // Single declaration of contextValue
  const contextValue = {
    getTotalCartItems,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
