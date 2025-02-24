import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faBell, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import tempLogo from "./temp_logo.png";
import "./Header.css"; 

function Header() {
  return (
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
        <button>Pickup</button>
      </div>

      <div className="icons">
        <div className="notification">
          <FontAwesomeIcon icon={faBell} />
          <span className="badge">4</span>
        </div>
        <div className="cart">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="cart-badge">0</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
