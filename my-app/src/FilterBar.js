import React from "react";
import "./FilterBar.css";

const filters = [
  { name: "Delivery Fees: Under $3", icon: "💲" },
  { name: "New to me", icon: "✨" },
  { name: "Deals", icon: "🏷️" },
  { name: "Pickup", icon: "📍" },
  { name: "Over 4.5 ★", icon: "⭐" },
  { name: "Under 30 min", icon: "⏳" },
  { name: "Price", icon: "💰" },
  { name: "DashPass", icon: "🚀" },
];

function FilterBar() {
  return (
    <div className="filter-bar">
      {filters.map((filter, index) => (
        <button key={index} className="filter-button">
          <span className="filter-icon">{filter.icon}</span>
          {filter.name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
