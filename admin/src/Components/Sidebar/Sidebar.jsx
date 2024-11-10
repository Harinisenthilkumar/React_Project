import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/add_product_icon.png'
import list_product_icon from '../../Assets/list_product_icon.png'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproducts"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Products</p>
        </div>
      </Link>
      <Link to={"/listproducts"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Products List</p>
        </div>
      </Link>
    </div>

    
  );
}

export default Sidebar




// import React, { useState } from "react";
// import "./Sidebar.css";
// import { Link } from "react-router-dom";
// import addProductIcon from "../../assets/add_product_icon.png";
// import listProductIcon from "../../assets/list_product_icon.png";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         ☰
//       </button>
//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <Link to="/addproducts" style={{ textDecoration: "none" }}>
//           <div className="sidebar-item">
//             <img src={addProductIcon} alt="Add Products" />
//             <p>Add Products</p>
//           </div>
//         </Link>
//         <Link to="/listproduct" style={{ textDecoration: "none" }}>
//           <div className="sidebar-item">
//             <img src={listProductIcon} alt="Products List" />
//             <p>Products List</p>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

