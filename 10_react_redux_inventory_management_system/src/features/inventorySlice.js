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
  {
    id: 2,
    name: "laptop",
    qty: 2,
    price: 75000,
    category: "electronics",
  },
  {
    id: 3,
    name: "headphones",
    qty: 3,
    price: 3000,
    category: "electronics",
  },
  {
    id: 4,
    name: "backpack",
    qty: 1,
    price: 2500,
    category: "fashion",
  },
  {
    id: 5,
    name: "watch",
    qty: 2,
    price: 5000,
    category: "accessories",
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
