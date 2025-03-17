import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import StoreList from "./home/StoreList";
import RestaurantPage from "./store/RestaurantPage";
import OrderTracking from "./order/OrderTracking";
import Cart from "./Cart";
import Header from "./components/Header"; 
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const addToCart = (item) => {

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      <Header />
      <div className="content-layout"> 
        <Sidebar /> 
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/restaurant/:id" element={<RestaurantPage addToCart={addToCart} />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/cart" element={
              <Cart 
                cartItems={cartItems} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
                isCartOpen={isCartOpen} 
                toggleCart={toggleCart}
              />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
