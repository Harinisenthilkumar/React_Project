import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const getTotalCartAmount = () => {
    return all_product.reduce((total, item) => {
      if (cartItems[item.id] > 0) {
        return total + item.new_price * cartItems[item.id];
      }
      return total;
    }, 0);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div>
        {all_product.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id} className="cartitems-format-main">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[item.id]}
                </button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(item.id)}
                  alt="Remove item"
                />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
        </div>
        <button>Proceed To Checkout</button>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
