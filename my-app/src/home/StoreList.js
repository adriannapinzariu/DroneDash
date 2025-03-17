import React, { useEffect, useState } from "react";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/stores") 
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      <div className="store-container">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <img src={store.image} alt={store.name} className="store-image" />
            <h3>{store.name}</h3>
            <p>Location: {store.location}</p>
            <ul>
              {store.products.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
