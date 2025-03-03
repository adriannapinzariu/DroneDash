import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryBar from "./CategoryBar";
import FilterBar from "./FilterBar";
import PromoBanner from "./PromoBanner";
import RestaurantCarousel from "./RestaurantCarousel";

import "./Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <Header /> 
      <div className="content-container">
        <Sidebar /> 
        <div className="main-content">
          <CategoryBar />
          <FilterBar />
          <PromoBanner />
          <RestaurantCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
