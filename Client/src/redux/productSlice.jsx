import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utilis/apiPath";

export const fetchProducts = createAsyncThunk("products/fetchAll", 
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(BASE_URL + API_PATHS.PRODUCT.GET_PRODUCT);
            return res.data?.products || res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.response || "Failed to fetch products");
        }
    }
);

const productSlice = createSlice({
    name:"products",
    initialState:{
        items:[],
        loading: false,
        error: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default productSlice.reducer;