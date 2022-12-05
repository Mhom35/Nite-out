import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tripsApi } from "./tripsApi";
import { authApiSlice } from "./authApiSlice";
import { accountSlice } from "./accountSlice";
import addLocationsReducer from "./locations";
import editLocationsReducer from "./editLocation";
import getTripIdReducer from "./tripId";

export const store = configureStore({
  reducer: {
    [tripsApi.reducerPath]: tripsApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    addLocations: addLocationsReducer,
    editLocations: editLocationsReducer,
    getTripId: getTripIdReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tripsApi.middleware)
      .concat(authApiSlice.middleware);
  },
});

setupListeners(store.dispatch);
