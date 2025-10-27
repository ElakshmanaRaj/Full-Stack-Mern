
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import favoriteReducer from "./favoriteSlice";
import cartReducer from "./cartSlice";
import userReducer from "./authSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer:{
        products: productReducer,
        categories: categoryReducer,
        favorites: favoriteReducer,
        cart: cartReducer,
        orders: orderReducer,
        user: userReducer,
    }
});