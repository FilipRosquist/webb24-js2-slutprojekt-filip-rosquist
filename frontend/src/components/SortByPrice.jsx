import React from 'react';

// Komponent för att sortera produkter efter pris
export function SortByPrice({ isSortedDescending, toggleSortByPrice }) {
  return (
    <button className="sort-button" onClick={toggleSortByPrice}>
      Sort by Price ({isSortedDescending ? 'High to Low' : 'Low to High'})
    </button>
  );
}
