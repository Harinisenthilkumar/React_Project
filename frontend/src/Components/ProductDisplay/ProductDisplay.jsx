import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
const ProductDisplay = (props) => {
  const { product } = props;
  const{addToCart}=useContext(ShopContext)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-image-list">
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="product"
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>(122 reviews)</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          <p>{product.description}</p>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select portion size</h1>
          <div className="productdisplay-right-size-list">
            <div>Small</div>
            <div>Medium</div>
            <div>Large</div>
            <div>Family</div>
          </div>
        </div>
        <button onClick={()=>addToCart(product.id)}>Add to Cart</button>
        <p className="productdisplay-right-category">
          <span>Category:</span> Vegetarian, Non-Vegetarian, Desserts
        </p>
        <p className="productdisplay-right-tags">
          <span>Tags:</span> Pure Veg, Biryani, Ice Cream
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
