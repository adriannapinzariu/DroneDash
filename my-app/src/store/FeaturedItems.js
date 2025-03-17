import React from "react";
import "./FeaturedItems.css";

const featuredItems = [
  {
    id: 1,
    name: "Build Your Own Bowl",
    price: "$14.95",
    rating: "94%",
    reviews: "(290)",
    image: "/food/food1.jpg",
    rank: "#1 Most Liked",
  },
  {
    id: 2,
    name: "Build Your Own Burrito",
    price: "$17.95",
    rating: "92%",
    reviews: "(83)",
    image: "/food/food2.jpeg",
    rank: "#2 Most Liked",
  },
  {
    id: 3,
    name: "H1. Jimmy's Creation Bowl",
    price: "$14.95",
    rating: "100%",
    reviews: "(32)",
    image: "/food/food3.jpg",
  },
  {
    id: 4,
    name: "H7. Spicy Tuna Poke Bowl (New)",
    price: "$14.95",
    rating: "97%",
    reviews: "(41)",
    image: "/food/food4.jpg",
    rank: "#3 Most Liked",
  },
];

function FeaturedItems() {
  return (
    <div className="featured-section">

      <div className="featured-items-container">
        {featuredItems.map((item) => (
          <div key={item.id} className="featured-item">
            <img src={item.image} alt={item.name} className="featured-image" />
            <h3 className="featured-name">{item.name}</h3>
            <p className="featured-price">{item.price}</p>
            <p className="featured-rating">👍 {item.rating} {item.reviews}</p>
            {item.rank && <span className="featured-rank">{item.rank}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedItems;