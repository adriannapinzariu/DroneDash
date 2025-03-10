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
    <div className="page-container">
      <Header />

      <div className="content-layout">
        <Sidebar />

        <div className="restaurant-page">
        
          <div className="restaurant-header">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
            <div className="restaurant-logo">
              <img src={restaurant.logo} alt={restaurant.name} />
            </div>
          </div>



          <div className="restaurant-content">
            {/* Name & Search Bar */}
            <div className="restaurant-header-section">
              <h1 className="restaurant-title">{restaurant.name}</h1>
              <div className="restaurant-search">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder={`Search ${restaurant.name}...`} 
                  className="search-bar"
                />
              </div>
            </div>

            <div className="restaurant-info-container">

                <div className="store-info">
                    <h2 className="store-info-title">Store Info</h2>
                    {restaurant.dashPass && <p className="dash-pass">🚀 DashPass</p>}
                    <p className="status">
                        ⏰ <span className="open-status">{restaurant.status}</span> • Closes at {restaurant.closingTime}
                    </p>
                    <p>⭐ {restaurant.rating} ({restaurant.reviews}) • {restaurant.distance}</p>
                    <p>{restaurant.price} • {restaurant.cuisine}</p>
                    <button className="see-more">See More</button>
                </div>

                            
 


                <div className="delivery-fee-container">

                <div className="delivery-options">
                    <div className="buttons">
                        <button className="delivery-option active">Delivery</button>
                        <button className="pickup-option">Pickup</button>
                        <button className="group-order">Group Order</button>
                    </div>
                </div>

                <div className="delivery-fee">
                    <p className="fee-price">{restaurant.fee}</p>
                    <p className="fee-text">pricing & fees</p>
                </div>

                <div className="divider"></div>

                <div className="delivery-time">
                    <p className="time-price">{restaurant.deliveryTime}</p>
                    <p className="time-text">delivery time</p>
                </div>
                </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
