import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const editLocationsSlice = createSlice({
  name: "editLocations",
  initialState: { value: initialState },
  reducers: {
    editLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { editLocation } = editLocationsSlice.actions;

export default editLocationsSlice.reducer;
