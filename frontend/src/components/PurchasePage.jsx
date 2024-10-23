import React from 'react';

export function PurchasePage({ onBackToProducts }) {
  return (
    <div className="purchase-page">
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been placed successfully.</p>
      <button onClick={onBackToProducts} className="back-to-products-button">
        Go back to Products
      </button>
    </div>
  );
}
