import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  
  const [selectedTip, setSelectedTip] = useState(5.50);
  const subtotal = 17.95;
  const deliveryFee = 0.49;
  const tax = 4.93;
  const total = subtotal + deliveryFee + tax + selectedTip;

  const handlePlaceOrder = () => {
    navigate("/order-tracking"); 
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <h1>🚀 Checkout</h1>
      </header>

      <div className="payment-container">
        {/* Left Panel */}
        <div className="shipping-details">
          <h2>📍 Shipping Details</h2>
          <p>25 E Jackson Blvd, Chicago, IL 60604</p>
          <button className="edit-button">Edit Address</button>

          <h3>📞 Contact</h3>
          <p>(224) 938-3847</p>

          <h3>🏡 Delivery Instructions</h3>
          <p>Leave it at my door</p>
        </div>

        {/* Right Panel */}
        <div className="order-summary">
          <h2>🛒 Order Summary</h2>
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> ${deliveryFee.toFixed(2)}</p>
          <p><strong>Fees & Tax:</strong> ${tax.toFixed(2)}</p>

          <h3>💰 Dasher Tip</h3>
          <div className="tip-options">
            {[4.50, 5.50, 6.50].map((tip) => (
              <button 
                key={tip} 
                className={selectedTip === tip ? "selected" : ""} 
                onClick={() => setSelectedTip(tip)}
              >
                ${tip.toFixed(2)}
              </button>
            ))}
          </div>

          <h3>💳 Payment Details</h3>
          <p>Chase •••• 1234</p>
          <button className="edit-button">Edit Payment</button>

          <h2>💵 Total: ${total.toFixed(2)}</h2>
          <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
