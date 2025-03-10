import React from "react";
import { restaurantData } from "./data/restaurants";
import "./RestaurantCarousel.css";

const openRestaurantTab = (id) => {
  window.open(`/restaurant/${id}`, "_blank", "noopener,noreferrer");
}; 

function RestaurantCarousel() {
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

export default RestaurantCarousel;
