import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const product = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{

    builder.addCase()

  }
});

export default product.reducer;
