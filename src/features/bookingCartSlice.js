import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("grandstay_cart") || "[]");

const bookingCartSlice = createSlice({
  name: "bookingCart",
  initialState: savedCart,
  reducers: {
    addRoomToCart: (state, action) => {
      if (!state.some(room => String(room.id) === String(action.payload.id))) {
        state.push(action.payload);
        localStorage.setItem("grandstay_cart", JSON.stringify(state));
      }
    },
    removeRoomFromCart: (state, action) => {
      const updated = state.filter(room => String(room.id) !== String(action.payload));
      localStorage.setItem("grandstay_cart", JSON.stringify(updated));
      return updated;
    },
    clearCart: () => {
      localStorage.removeItem("grandstay_cart");
      return [];
    }
  }
});

export const { addRoomToCart, removeRoomFromCart, clearCart } = bookingCartSlice.actions;
export default bookingCartSlice.reducer;
