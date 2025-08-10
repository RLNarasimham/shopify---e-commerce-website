import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, Product } from "../../types";

const initialState: CartState = {
  items: [] as CartItem[],
  isOpen: false,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
        });
      }
      state.total = state.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      );
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = state.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      state.total = state.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      );
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
