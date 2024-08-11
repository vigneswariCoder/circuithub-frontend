import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [openOrderDialog, setOpenOrderDialog] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [paymentType, setPaymentType] = React.useState('Credit Card');

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleOrderClick = () => {
    setOpenOrderDialog(true);
  };

  const handleCloseOrderDialog = () => {
    setOpenOrderDialog(false);
  };

  const handlePlaceOrder = () => {
    // You can handle the order logic here or dispatch an action if needed
    // For now, just navigate to the order summary or order confirmation page
    navigate('/place-order');
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6">${product.price.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOrderClick}>
            Order Now
          </Button>
        </CardContent>
      </Card>

      {/* Order Dialog */}
      <Dialog open={openOrderDialog} onClose={handleCloseOrderDialog}>
        <DialogTitle>Place Your Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            id="payment-type"
            label="Payment Type"
            type="text"
            fullWidth
            variant="outlined"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrderDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePlaceOrder} color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
