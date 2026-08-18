import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "phone",
      qty: 1,
      price: 50000,
      category: "electronics",
    },
  ],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    add: (state, action) => {
      const newProduct = {
        id: new Date().getTime(),
        name: action.payload.name,
        qty: action.payload.qty,
        price: action.payload.price,
        category: action.payload.category,
      };

      state.products.push(newProduct);

      console.log("state",[...state.products])
    },
  },
});

export const { add } = inventorySlice.actions;

export default inventorySlice.reducer;
