import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;


export const getTripIdSlice = createSlice({
    name: "trips",
    initialState: { value: initialState },
    reducers: {
        getTripId: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { getTripId } = getTripIdSlice.actions;

export default getTripIdSlice.reducer
