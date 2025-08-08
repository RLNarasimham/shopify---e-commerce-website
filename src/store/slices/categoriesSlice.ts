import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

const FAKESTORE_CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

interface CategoriesState {
  list: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(FAKESTORE_CATEGORIES_URL);

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const selectCategories = (state: RootState) => state.categories.list;
export default categoriesSlice.reducer;
