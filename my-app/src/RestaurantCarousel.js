import React from "react";
import "./RestaurantCarousel.css";

//temp data 
const restaurants = [
  {
    name: "XENiA: Mediterranean Kitchen",
    rating: "4.3",
    reviews: "200+",
    distance: "1.0 mi",
    time: "14 min",
    fee: "$0.49 delivery fee",
    offer: "20% off select items",
    sponsored: true,
    image: "./food_1.avif",
  },
  {
    name: "Poke Burrito",
    rating: "4.6",
    reviews: "6k+",
    distance: "0.9 mi",
    time: "37 min",
    fee: "$0.49 delivery fee",
    offer: "Free item on $30+",
    sponsored: false,
    image: "./food_2.avif",
  },
  {
    name: "Raising Cane's",
    rating: "4.2",
    reviews: "1.2k",
    distance: "1.2 mi",
    time: "39 min",
    fee: "$3.99 delivery fee",
    offer: "",
    sponsored: false,
    image: "./food_3.avif",
  },
];

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
        {restaurants.map((restaurant, index) => (
            <div key={restaurant.id} className="restaurant-card" onClick={() => openRestaurantTab(restaurant.id)}>
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>
                ⭐ {restaurant.rating} ({restaurant.reviews}) • {restaurant.distance} • {restaurant.time}
              </p>
              <p>{restaurant.fee}</p>
         
              {restaurant.sponsored && <span className="sponsored">Sponsored</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantCarousel;
