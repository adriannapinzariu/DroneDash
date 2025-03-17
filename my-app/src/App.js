import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import RestaurantPage from "./store/RestaurantPage";
import Cart from "./Cart";
import Header from "./components/Header"; 
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="content-layout"> 
        <Sidebar /> 
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
