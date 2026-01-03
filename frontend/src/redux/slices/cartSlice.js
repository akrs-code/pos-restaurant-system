import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const incoming = action.payload;

      const existing = state.find(
        item => item.name === incoming.name
      );

      if (existing) {
        existing.quantity += incoming.quantity;
      } else {
        state.push(incoming);
      }
    },

    removeItem: (state, action) => {
      return state.filter(item => item.name !== action.payload);
    },

    clearCart: () => []
  }
});

export const getTotalPrice = (state) =>
  state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
