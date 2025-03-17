import React from "react";
import "./CategoryBar.css";

const categories = [
  { name: "Trending", icon: "🔥" },
  { name: "Acclaimed", icon: "🏆" },
  { name: "Coffee", icon: "☕" },
  { name: "Salad", icon: "🥗" },
  { name: "Breakfast", icon: "🥚" },
  { name: "Sandwiches", icon: "🧀" },
  { name: "Sushi", icon: "🍣" },
  { name: "Pizza", icon: "🍕" },
  { name: "Ramen", icon: "🍜" },
  { name: "Mexican", icon: "🌯" },
  { name: "Indian", icon: "🥘" },
  { name: "Burgers", icon: "🍔" },
];

function CategoryBar() {
  return (
    <div className="category-bar">
      {categories.map((category, index) => (
        <div key={index} className="category-item">
          <span className="category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </div>
      ))}
      <button className="scroll-button">{">"}</button>
    </div>
  );
}

export default CategoryBar;
