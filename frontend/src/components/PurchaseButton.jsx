import React from 'react';

export function PurchaseButton({ onPurchase }) {
  return (
    <button onClick={onPurchase} className="purchase-button">
      Purchase
    </button>
  );
}
