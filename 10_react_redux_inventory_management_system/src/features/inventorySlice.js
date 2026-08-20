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
  editValue: null,
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
    },

    handleDelete: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    setEditValue: (state, action) => {
      state.editValue = state.products.find((p) => p.id === action.payload);
    },

    handleEdit: (state, action) => {
      const ProductIndex = state.products.findIndex(
        (p) => p.id === state.editValue.id,
      );

      console.log("product index", ProductIndex);

      if (ProductIndex !== -1) {
        state.products[ProductIndex] = action.payload;
      }

      state.editValue = null;
    },
  },
});

export const { add, handleDelete, setEditValue, handleEdit } =
  inventorySlice.actions;

export default inventorySlice.reducer;
