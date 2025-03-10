import React from "react";
import { useParams } from "react-router-dom";
import { restaurantData } from "./data/restaurants";
import "./RestaurantPage.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

function RestaurantPage() {
  const { id } = useParams();
  const restaurant = restaurantData[id];

  if (!restaurant) {
    return <h2>Restaurant Not Found</h2>;
  }

  return (
    <div className="restaurant-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="restaurant-page">
          <div className="restaurant-header">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
            <div className="restaurant-logo">
              <img src={restaurant.logo} alt={restaurant.name} />
            </div>
          </div>

          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p>⭐ {restaurant.rating} ({restaurant.reviews} ratings) • {restaurant.cuisine} • {restaurant.distance}</p>
            <div className="tags">
              {restaurant.friendlyTags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            <div className="delivery-details">
              <button className="delivery-option">Delivery</button>
              <button className="pickup-option">Pickup</button>
              <button className="group-order">Group Order</button>
              <div className="delivery-fee">
                {restaurant.fee} <span>{restaurant.deliveryTime} delivery time</span>
              </div>
            </div>

            {restaurant.deals && (
              <div className="deals">
                <p>🔥 {restaurant.deals}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
