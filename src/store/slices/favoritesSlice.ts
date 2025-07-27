import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((p) => p.id === action.payload.id);
      if (existing) {
        state.items = state.items.filter((p) => p.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
