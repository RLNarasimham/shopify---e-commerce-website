// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "../index";
// import { createSelector } from "@reduxjs/toolkit";

// // Keywords that map to the "men's clothing" category
// const MEN_KEYWORDS = ["men", "male", "tshirt", "shirt", "jeans", "jacket"];

// // Define the product type
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   // Add this line:
//   isFavourite?: boolean;
// }

// interface ProductsState {
//   all: Product[];
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: ProductsState = {
//   all: [],
//   loading: false,
//   error: null,
// };

// // Async thunk to fetch products from your API
// export const fetchProducts = createAsyncThunk<Product[]>(
//   "products/fetchAll",
//   async () => {
//     const res = await fetch("https://fakestoreapi.com/products"); // Replace with your own API
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return await res.json();
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     toggleFavourite: (state, action) => {
//       const product = state.all.find((p) => p.id === action.payload);
//       if (product) {
//         product.isFavourite = !product.isFavourite;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchProducts.fulfilled,
//         (state, action: PayloadAction<Product[]>) => {
//           state.all = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Something went wrong";
//       });
//   },
// });

// // Selector to get filtered products by search query
// export const selectFilteredProducts = createSelector(
//   [
//     (state: RootState) => state.products.all,
//     (state: RootState) => state.ui.searchQuery,
//   ],
//   (products, query) => {
//     const q = query.trim().toLowerCase();

//     if (!q) return products;

//     return products.filter((product) => {
//       const title = product.title?.toLowerCase() || "";
//       const category = product.category?.toLowerCase() || "";

//       const nameMatch = title.includes(q);
//       const exactCategoryMatch = category.includes(q);

//       // Strict manual category mapping
//       const menAliasMatch =
//         MEN_KEYWORDS.some((keyword) => q.includes(keyword)) &&
//         category === "men's clothing";

//       return nameMatch || exactCategoryMatch || menAliasMatch;
//     });
//   }
// );

// export default productsSlice.reducer;

// export const { toggleFavourite } = productsSlice.actions;

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Product } from "../../types";

// Extend the product type as needed for your app
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  isFavourite?: boolean;
}

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

const API_BASE_URL = "https://fakestoreapi.com";

if (!API_BASE_URL) {
  throw new Error("Missing API_BASE_URL in environment variables");
}

// import.meta.env.VITE_API_BASE_URL || "https://fakestoreapi.com";

// --- Async thunk to fetch products ---
// export const fetchProducts = createAsyncThunk<Product[]>(
//   "products/fetchAll",
//   async () => {
//     const res = await fetch(`${API_BASE_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return await res.json();
//   }
// );

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    if (!API_BASE_URL) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const res = await fetch(`${API_BASE_URL}/products`);

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

// --- Selector for search & filtering ---
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

      // Strict manual mapping for "men's clothing"
      const menAliasMatch =
        MEN_KEYWORDS.some((keyword) => q.includes(keyword)) &&
        category === "men's clothing";

      return nameMatch || exactCategoryMatch || menAliasMatch;
    });
  }
);

export default productsSlice.reducer;
export const { toggleFavourite } = productsSlice.actions;
