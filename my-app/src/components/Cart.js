import React from "react";
import "./Cart.css";

const cartItem = {
  name: "H7. Spicy Tuna Poke Bowl (New)",
  details: "White Rice, Large",
  price: "$17.95",
  image: "/food/food4.jpg",
  quantity: 1,
};

const complementaryItems = [
  { id: 1, name: "Miso Soup", price: "$2.95", image: "/cart/one.jpeg" },
  { id: 2, name: "Milk Tea with Tapioca", price: "$6.45", image: "/cart/two.jpeg" },
  { id: 3, name: "Smoothie with Popping Boba", price: "$6.95", image: "/cart/three.jpg" },
];

function Cart({ isCartOpen, toggleCart }) {
  return (
    <div className={`cart-container ${isCartOpen ? "open" : ""}`}>

      <button className="cart-close" onClick={toggleCart}>✖</button>

      <h3 className="cart-title">Your cart from <span className="cart-restaurant">Poke Burrito</span></h3>
      <button className="cart-continue">Pay Now</button>

      <div className="cart-item">
        <img src={cartItem.image} alt={cartItem.name} className="cart-item-image" />
        <div className="cart-item-details">
          <h4 className="cart-item-name">{cartItem.name}</h4>
          <p className="cart-item-desc">{cartItem.details}</p>
          <p className="cart-item-price">{cartItem.price}</p>
        </div>
        <div className="cart-item-actions">
          <button className="cart-remove">🗑️</button>
          <span className="cart-quantity">{cartItem.quantity}</span>
          <button className="cart-add">+</button>
        </div>
      </div>

{/*
{cartItems.length === 0 ? (
        <p className="cart-placeholder">Your cart is empty</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item"> 
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>−</button>
                <span className="cart-quantity">{item.quantity}</span>
                <button className="cart-add" onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}*/}


      <h4 className="cart-suggestions-title">Complement your cart</h4>
      <div className="cart-suggestions">
        {complementaryItems.map((item) => (
          <div key={item.id} className="cart-suggestion-item">
            <img src={item.image} alt={item.name} className="cart-suggestion-image" />
            <p className="cart-suggestion-name">{item.name}</p>
            <p className="cart-suggestion-price">{item.price}</p>
            <button className="cart-add-button">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
