import React, { useState, useEffect } from "react";
import { restaurantData } from "../data/restaurants";
import "./RestaurantCarousel.css";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const GOOGLE_PHOTOS_API = "https://maps.googleapis.com/maps/api/place/photo";


const openRestaurantTab = (googlePlaceId) => {
  window.open(`/restaurant/${googlePlaceId}`, "_blank");
};

function RestaurantCarousel() {
  const [stores, setStores] = useState([]);
  const [location, setLocation] = useState(null); 
  const [error, setError] = useState(null);

  // Geolocation use effect hook
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = `${position.coords.latitude},${position.coords.longitude}`;
        fetch(`http://127.0.0.1:5000/api/stores?location=${userLocation}&radius=1500`)
          .then((response) => response.json())
          .then((data) => setStores(data.places))
          .catch((error) => console.error("Error fetching stores:", error));
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    }
  }, []);
  

  // Fetch stores when location is available
  useEffect(() => {
    if (location) {
      fetch(`http://127.0.0.1:5000/api/stores?location=${location}&radius=1500`)
        .then(response => response.json())
        .then(data => {
          setStores(data.results);
        })
        .catch(error => {
          console.error("Error fetching stores:", error);
          setError("Something went wrong. Please refresh.");
        });
    }
  }, [location]);
  

    return (
      <div className="restaurant-carousel">
        <div className="carousel-header">
          <h2>Quick and affordable lunches</h2>
          <button className="see-all">See All &gt;</button>
        </div>

        <div className="carousel">
         {Object.entries(restaurantData).map(([id, restaurant]) => (
           <div key={id} className="restaurant-card" onClick={() => openRestaurantTab(id)}>
             <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
             <div className="restaurant-info">
               <h3>{restaurant.name}</h3>
               <p>⭐ {restaurant.rating} ({restaurant.reviews}) • {restaurant.distance} • {restaurant.time}</p>
               <p>{restaurant.fee}</p>
               {restaurant.dashPass && <span className="dash-pass">DashPass</span>}
               {restaurant.deals && <span className="deals">{restaurant.deals}</span>}
             </div>
           </div>
           ))}
      </div>
    </div>
  );
}
       
       {/*
        <div className="carousel">
      {stores.length === 0 && !error ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        stores.map((store, index) => (
          <div
            key={store.place_id || index}
            className="restaurant-card"
            onClick={() => openRestaurantTab(store.place_id)}
          >
          <img
              src={
                store.photos && store.photos.length > 0
                  ? store.photos[0].authorAttributions[0].photoUri
                  : "https://via.placeholder.com/400x300"
              }
            alt={store.displayName?.text || "Restaurant"}
            className="restaurant-image"
          />
            <div className="restaurant-info">
              <h3>{store.displayName?.text || "Unknown Restaurant"}</h3>
              <p>
                ⭐ {store.rating || "No rating"} • {store.formattedAddress || "Address unavailable"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>

       {/*
        <div className="debug-api">
        <h3>Fetched Stores Data (Debugging)</h3>
        <pre>{JSON.stringify(stores, null, 2)}</pre>
      </div> */}
        

 

export default RestaurantCarousel;
