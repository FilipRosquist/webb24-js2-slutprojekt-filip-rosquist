import React, { useState } from 'react';
import { ProductList } from './ProductList';
import { NavBar } from './NavBar';

export function App() {
  const [viewStatus, setViewStatus] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleToggleView = (status) => {
    setViewStatus(status);
    if (status === 'products') {
      setSearchTerm('');
    }
  };

  const getTotalCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <header>
        <h1>Vincents Online-Store</h1>
        <NavBar 
          onToggleView={handleToggleView} 
          cartItemCount={getTotalCartQuantity()}
        />
      </header>
      <ProductList 
        viewStatus={viewStatus} 
        cartItems={cartItems} 
        setCartItems={setCartItems} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onToggleView={handleToggleView}
      />
    </div>
  );
}
