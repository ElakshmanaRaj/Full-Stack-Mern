import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utilis/apiPath";


export const fetchCategories = createAsyncThunk("categories/fetchAll", 
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(BASE_URL + API_PATHS.CATEGORY.GET_CATEGORY);
            return res.data.category || [];
        } catch (err) {
            return rejectWithValue (err.respone?.data?.message || err.respone || "Error to fetch categories")   
        }
    }
);

const categorySlice = createSlice({
    name:"categories",
    initialState:{
        items:[],
        loading: false,
        error: null
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCategories.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default categorySlice.reducer;