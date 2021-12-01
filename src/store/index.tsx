import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
