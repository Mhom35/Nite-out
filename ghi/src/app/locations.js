import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const addLocationsSlice = createSlice({
  name: "locations",
  initialState: { value: initialState },
  reducers: {
    addLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addLocation } = addLocationsSlice.actions;

export default addLocationsSlice.reducer;
