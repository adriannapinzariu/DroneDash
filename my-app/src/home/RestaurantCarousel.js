import React, { useState, useEffect } from "react";
import { restaurantData } from "../data/restaurants";
import "./RestaurantCarousel.css";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const openRestaurantTab = (id) => {
  window.open(`/restaurant/${id}`, "_blank", "noopener,noreferrer");
}; 

function RestaurantCarousel() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // add my geolocation
    const location = "40.730610,-73.935242"; 
    const radius = 1500;


    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=latitude,longitude&radius=1500&type=restaurant&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setStores(data.results))
      .catch((error) => console.error("Error fetching stores:", error));
  }, [apiKey]);

    return (
      <div className="restaurant-carousel">
        <div className="carousel-header">
          <h2>Quick and affordable lunches</h2>
          <button className="see-all">See All &gt;</button>
        </div>



       
        <div className="carousel">
        {stores.map((store, index) => (
          <div key={index} className="restaurant-card" onClick={() => openRestaurantTab(store.place_id)}>
            <img src={store.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${store.photos[0].photo_reference}&key=${apiKey}` : 'https://via.placeholder.com/400x300'} 
              alt={store.name} className="restaurant-image" />
            <div className="restaurant-info">
              <h3>{store.name}</h3>
              <p>⭐ {store.rating} • {store.vicinity}</p>
            </div>
          </div>
        ))}
      </div>
          

  

        
        <div className="debug-api">
        <h3>Fetched Stores Data (Debugging)</h3>
        <pre>{JSON.stringify(stores, null, 2)}</pre>
      </div>
    </div>

      
    );
  }

export default RestaurantCarousel;
