import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the CartState type
interface CartState {
  items: CartItem[];
}

// Define initial state
const initialState: CartState = {
  items: [],
};

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
