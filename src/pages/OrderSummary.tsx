import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const total = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Order Summary</h1>
      <ul>
        {cartItems.map((item: any) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default OrderSummary;
