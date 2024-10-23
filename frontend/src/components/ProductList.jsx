import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/fetchproducts';
import { SearchBar } from './SearchBar';
import { ShoppingCart } from './ShoppingCart';
import { SortByPrice } from './SortByPrice';

export function ProductList({ viewStatus, cartItems, setCartItems, searchTerm, setSearchTerm, onToggleView }) {
  const [products, setProducts] = useState([]);
  const [isSortedDescending, setIsSortedDescending] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []); 

  const toggleSortByPrice = () => {
    setIsSortedDescending(!isSortedDescending);
  };

  // Lägg till produkt i kundvagnen baserat på lagerstatus
  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find(item => item.id === product.id);

    // Kontrollera om produkten finns i lager
    if (product.stock > 0) {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id
            ? { ...p, stock: p.stock - 1 }
            : p
        )
      );

      if (existingCartItem) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems(prevItems => [
          ...prevItems,
          { ...product, quantity: 1 }
        ]);
      }
    }
  };


  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );

    // Ökar lagersaldot för produkten i produktlistan
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, stock: p.stock + 1 }
          : product
      )
    );
  };

  // Återställ kundvagnen och återställ produkters lagersaldo
  const handleResetCart = () => {
    setCartItems([]);  // Töm kundvagnen
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock + cartItem.quantity };  // Återställ lagersaldo
        }
        return product;
      })
    );
  };

  // Filtrerar och sorterar produkterna baserat på vad användaren sökt på samt sorteringsordningen
  const filteredAndSortedProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => 
      isSortedDescending ? b.price - a.price : a.price - b.price
    );

  return (
    <div className="product-list">
      {viewStatus === 'cart' ? (
        <ShoppingCart 
          cartItems={cartItems} 
          onRemove={handleRemoveFromCart}
          onResetCart={handleResetCart}
          onViewProducts={() => onToggleView('products')}
        />
      ) : (
        <>
          <div className="search-sort-container">
            <SearchBar 
              searchTerm={searchTerm}
              onSearch={() => {}}
              setSearchTerm={setSearchTerm}
            />
            <SortByPrice
              isSortedDescending={isSortedDescending}
              toggleSortByPrice={toggleSortByPrice}
            />
          </div>
          {filteredAndSortedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="product-grid">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
                  <button 
                    className="add-button"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
