import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utilis/apiPath";


export const fetchUser = createAsyncThunk("user/fetchUser", 
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return rejectWithValue("No token found");
          }
    try {
        const res = await axios.get(`${BASE_URL}${API_PATHS.AUTH.GET_PROFILE}`, {
            headers:{
                Authorization:`Bearer ${token}`
            },
        });
        return res.data.user;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Error to fetch user details");
    }
}) 

const userSlice = createSlice({
    name:"user",
    initialState:{
        user: null,
        loading: false,
        error: null
    }, 
    reducers:{
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;