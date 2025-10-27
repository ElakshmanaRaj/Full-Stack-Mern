import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utilis/apiPath";


// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (products, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.ORDER.CREATE_ORDER}`,
        { products },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return res.data.orderDetails;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// fetched user order after logging in
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders", 
  async (_, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}${API_PATHS.ORDER.USER_ORDER}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState: { 
    items: [], 
    newOrder: null,
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload;
        state.items.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
