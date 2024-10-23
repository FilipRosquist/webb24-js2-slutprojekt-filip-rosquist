import React from 'react';

// NavBar-komponent som tillåter växling mellan produktsidan och kundvagnen
export function NavBar({ onToggleView, cartItemCount }) {
  return (
    <header>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={() => onToggleView('products')}>
          Products
        </button>

        <button className="nav-button" onClick={() => onToggleView('cart')}>
          {/* Visar antalet produkter om det är mer än 0*/}
          Cart {cartItemCount > 0 && `(${cartItemCount})`}
        </button>
      </div>
    </header>
  );
}
