import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <Header /> 
      <div className="content-container">
        <Sidebar /> 
        <div className="main-content">
          <h1>Welcome to DroneDash</h1>
          <p>Browse categories and find your favorite meals.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
