import React from "react";
import "./Cart.css";

const cartItem = {
  name: "H7. Spicy Tuna Poke Bowl (New)",
  details: "White Rice, Large",
  price: "$17.95",
  image: "https://via.placeholder.com/80",
  quantity: 1,
};

const complementaryItems = [
  { id: 1, name: "Miso Soup", price: "$2.95", image: "https://via.placeholder.com/80" },
  { id: 2, name: "Milk Tea with Tapioca", price: "$6.45", image: "https://via.placeholder.com/80" },
  { id: 3, name: "Japanese Spring Rolls", price: "$6.95", image: "https://via.placeholder.com/80" },
  { id: 4, name: "Smoothie with Popping Boba", price: "$6.95", image: "https://via.placeholder.com/80" },
  { id: 5, name: "Shrimp Shumai", price: "$8.95", image: "https://via.placeholder.com/80" },
];

function Cart({ isCartOpen, toggleCart }) {
  return (
    <div className={`cart-container ${isCartOpen ? "open" : ""}`}>

      <button className="cart-close" onClick={toggleCart}>✖</button>

      <h3 className="cart-title">Your cart from <span className="cart-restaurant">Poke Burrito</span></h3>
      <button className="cart-continue">Pay Now</button>

      {/* Cart Item */}
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
