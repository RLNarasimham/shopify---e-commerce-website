import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Product } from "../../types";

interface ProductsState {
  all: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  all: [],
  loading: false,
  error: null,
};

const FAKESTORE_API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(FAKESTORE_API_URL);

    if (!res.ok) {
      const errorText = await res.text();
      return rejectWithValue(`Server error: ${errorText || res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Network error");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
      const product = state.all.find((p) => p.id === action.payload);
      if (product) {
        product.isFavourite = !product.isFavourite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.all = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

const MEN_KEYWORDS = ["men", "male", "tshirt", "shirt", "jeans", "jacket"];

export const selectFilteredProducts = createSelector(
  [
    (state: RootState) => state.products.all,
    (state: RootState) => state.ui.searchQuery,
  ],
  (products, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";

      const nameMatch = title.includes(q);
      const exactCategoryMatch = category.includes(q);

      const menAliasMatch =
        MEN_KEYWORDS.some((keyword) => q.includes(keyword)) &&
        category === "men's clothing";

      return nameMatch || exactCategoryMatch || menAliasMatch;
    });
  }
);

export default productsSlice.reducer;
export const { toggleFavourite } = productsSlice.actions;
