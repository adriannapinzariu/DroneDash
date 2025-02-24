import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryBar from "./CategoryBar";
import FilterBar from "./FilterBar";

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
          <h1>Welcome to DroneDash</h1>
          <p>Browse categories and find your favorite meals.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
