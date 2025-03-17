import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faBell, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"; 
import Cart from "./Cart"; // Import Cart Component

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="https://1000logos.net/doordash-logo/" alt="DroneDash" />
        </div>

        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search DoorDash" />
        </div>

        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <span>123 North Avenue</span>
        </div>

        <div className="delivery-options">
          <button className="active">Delivery</button>
        </div>

        <div className="icons">
          <div className="notification">
            <FontAwesomeIcon icon={faBell} />
            <span className="badge">4</span>
          </div>
          <div className="cart" onClick={toggleCart}> {/* Click to Open Cart */}
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-badge">0</span>
          </div>
        </div>
      </header>

      {/* Cart Slide-In Panel */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-overlay" onClick={toggleCart}></div>
        <div className="cart-content">
          <button className="cart-close" onClick={toggleCart}>✖</button>
          <Cart />  {/* Render Cart Here */}
        </div>
      </div>
    </>
  );
}

export default Header;
