import { createSlice } from "@reduxjs/toolkit";

const initialFavorite = () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
};
  
const favoriteSlice = createSlice({
    name:"favorites",
    initialState:{
        items: initialFavorite(),
    },
    reducers:{
        addToFavorite: (state, action)=>{
            const exists = state.items.some(item => item.id === action.payload.id);
            if(!exists){
                state.items.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.items));
            }
        },
        removeFromFavorite: (state, action)=>{
            const remove = state.items.filter((item)=> item.id !== action.payload);
            state.items = remove;
            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
        clearItems: (state)=>{
            state.items = [];
            localStorage.clear();
        }
    }
});

export const { addToFavorite, removeFromFavorite, clearItems } = favoriteSlice.actions;

export default favoriteSlice.reducer;