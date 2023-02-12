import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlist_id : 0,
    trip_id: 0
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFav: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        deleteFromFav: (state, action) => {
            state.show = action.payload;
        },
        clearForm: () => {
            return initialState;
        }
    },
});

export const {
    clearForm,
    addToFav,
    showModal,
} = favoritesSlice.actions;


export default favoritesSlice.reducer;
