import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  customerName: "",
  guests: "",
  tableId: ""
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, guests } = action.payload;
      state.orderId = Date.now().toString();
      state.customerName = name;
      state.guests = guests;
      state.tableId = "";
    },
    updateTable: (state, action) => {
      state.tableId = action.payload.tableId;
    },
    removeCustomer: () => initialState
  }
});

export const { setCustomer, updateTable, removeCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
