import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { placeOrder } from '../services/apiService';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems,
      total: cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0),
      address: '123 Example St, Sample City, SC 12345',
      status: 'Pending',
    };
    await placeOrder(orderData);
    dispatch(clearCart());
    alert('Order placed successfully');
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item: any) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CartPage;
