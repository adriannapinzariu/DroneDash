import { useEffect } from "react";
import "./OrderTracking.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const depaulLocation = [41.8785, -87.6271];
const deliveryLocation = [41.8843, -87.6324]; 

const deliveryIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3203/3203656.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  
  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  

function OrderTracking() {

    useEffect(() => {
        const map = L.map("map").setView([41.8785, -87.6271], 13);
    
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    
        L.marker([41.8785, -87.6271])
          .addTo(map)
          .bindPopup("📦 Your order is on the way!")
          .openPopup();
    
        return () => {
          map.remove();
        };
      }, []);

  return (
    <div className="order-tracking-page">
      <header className="order-header">
        <h1>🚀 Your Order Has Been Submitted!</h1>
        <p>Track your delivery below</p>
      </header>

      <div className="order-container">
        {/* Left Panel */}
        <div className="order-details">
          <h2>📦 Order #123456789</h2>
          <p><strong>Pickup Time:</strong> 12:25 PM</p>
          <p><strong>Estimated Dropoff:</strong> 12:50 PM</p>
          
          <hr />
          

          <h3>👤 Customer</h3>
          <p>John Doe</p>
          <p>📞 +1 888-888-8888</p>

          <hr />

          <h3>🚗 Dasher</h3>
          <p>Mike D.</p>
          <p>📞 +1 888-888-9999</p>
          <p className="dasher-note">* Please contact the dasher using the same phone number used for ordering.</p>

          <hr />

          <h3>🛒 Order Details</h3>
          <p>2 items • $17.94 subtotal</p>

          <button className="contact-support">📞 Contact Support</button>
        </div>

        {/* Right Panel (Map) */}
        <div className="order-map">
          <div className="status-box">
            <h2>On the way to customer</h2>
            <p>Your order was picked up at 12:25 PM.</p>
          </div>
          <div id="map" className="map-container"></div>



          <div className="eta-box">
            <h3>📍 Dropoff ETA</h3>
            <p>12:54 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
