import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types";
import { createOrder } from "../../services/api";
import { clearCart } from "./cartSlice";
import axios from "axios";

export const submitOrder = createAsyncThunk<
  Order,
  Order,
  { rejectValue: string }
>("order/submit", async (order, { dispatch, rejectWithValue }) => {
  try {
    const response = await createOrder(order);
    dispatch(clearCart());
    return response.data;
  } catch (error: unknown) {
    let message = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      message = data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

interface OrderState {
  loading: boolean;
  error: string | null;
  order?: Order;
}

const initialState: OrderState = {
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Order submission failed";
      });
  },
});

export default orderSlice.reducer;
