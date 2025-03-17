import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faBell, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"; 
import Cart from "./Cart"; 

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="DroneDash" />
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
          <div className="cart" onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-badge">0</span>
          </div>
        </div>
      </header>

      <div className={`cart-overlay ${isCartOpen ? "open" : ""}`} onClick={toggleCart}></div>

      <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>

  );
}

export default Header;
