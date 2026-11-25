import { configureStore } from "@reduxjs/toolkit";
import bookingCartReducer from "../features/bookingCartSlice";

export const store = configureStore({
  reducer: {
    bookingCart: bookingCartReducer
  }
});
