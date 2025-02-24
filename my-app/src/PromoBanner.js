import React from "react";
import "./PromoBanner.css";

function PromoBanner() {
  return (
    <div className="promo-banner">
      <div className="promo-card light-green">
        <h2>Get 50% off (up to $15) 2 deliveries with subtotal $10+</h2>
        <p>Code: <strong>ITS50OFF2</strong>. Valid 14 days.</p>
        <button className="promo-button">Terms apply</button>
      </div>

      <div className="promo-card dark-blue">
        <h2>Get your first two months for <br /> $4.99/month.</h2>
        <p>Save 50% on DashPass.</p>
        <button className="promo-button white">Sign up</button>
      </div>
    </div>
  );
}

export default PromoBanner;
