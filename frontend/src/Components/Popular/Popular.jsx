import React, { useState,useEffect } from "react";
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from "../Item/Item";

const Popular = () => {
  const[popularItems,setPopularItems] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:4000/popularinvegetarian")
    .then((response) => response.json())
    .then((data) => setPopularItems(data));
    
  },[])

  return (
    <div className="popular">
      <h1>Popular In Vegetarian</h1>
      <hr />
      <div className="popular-items">
        {popularItems.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
