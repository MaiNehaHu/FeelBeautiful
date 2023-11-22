import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://makeup-api.herokuapp.com/api/v1/products.json";

// Create an async thunk to fetch the products
export const fetchProductsList = createAsyncThunk(
  "ItemsList/fetchProductsList",
  async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error("An error occurred: \n", error);
    }
  }
);

const ProductListSlice = createSlice({
  name: "ItemsList",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductListSlice.reducer;
