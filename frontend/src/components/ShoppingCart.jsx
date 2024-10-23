import React, { useState } from 'react';
import { PurchaseButton } from './PurchaseButton';
import { PurchasePage } from './PurchasePage';

export function ShoppingCart({ cartItems, onRemove, onResetCart, onViewProducts }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  const handlePurchase = () => {
    setIsPurchased(true);
    onResetCart();
  };

  // Om köpet är genomfört, visa köpsidan och ge möjlighet att gå tillbaka till produktsidan
  if (isPurchased) {
    return (
      <PurchasePage
        onBackToProducts={() => {
          setIsPurchased(false);
          onViewProducts();
        }}
      />
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          <ul>
            {/* Loopa genom varje artikel i kundvagnen*/}
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => onRemove(item.id)}>Remove</button>
                </div>
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </li>
            ))}
          </ul>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <PurchaseButton onPurchase={handlePurchase} />
        </>
      )}
    </div>
  );
}
