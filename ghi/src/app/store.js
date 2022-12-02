import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tripsSlice } from "./tripsSlice";
import { authApiSlice } from "./authApiSlice";
import { accountSlice } from "./accountSlice";
import addLocationsReducer from "./locations";
import editLocationsReducer from "./editLocation";

export const store = configureStore({
  reducer: {
    [tripsSlice.reducerPath]: tripsSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    addLocations: addLocationsReducer,
    editLocations: editLocationsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(tripsSlice.middleware)
      .concat(authApiSlice.middleware);
  },
});

setupListeners(store.dispatch);
