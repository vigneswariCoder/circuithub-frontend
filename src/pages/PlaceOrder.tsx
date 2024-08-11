import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Typography, Container } from '@mui/material';
import { CartItem } from '../redux/slices/cartSlice';  // Import the CartItem type
import { placeOrder } from '../services/apiService'; // Import the API service

const PlaceOrder: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const total = cart.items.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    try {
      const orderData = {
        items: cart.items,
        total: total,
        address: '123 Example St, Sample City, SC 12345',
        status: 'Pending',
      };

      // Call the API service to place the order
      await placeOrder(orderData);

      // Optionally, clear the cart or redirect to another page
      alert('Order placed successfully!');
      // Redirect or clear cart
    } catch (error) {
      alert('Failed to place order.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Order Summary</Typography>
      <Typography variant="h6">Items:</Typography>
      {cart.items.map((item: CartItem) => (
        <Typography key={item.id}>
          {item.name} - ${item.price.toFixed(2)} x {item.quantity}
        </Typography>
      ))}
      <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </Container>
  );
};

export default PlaceOrder;
