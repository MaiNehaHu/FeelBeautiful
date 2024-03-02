import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const productsListAPI = "https://makeup-api.herokuapp.com/api/v1/products.json";
const dollarValueAPI = "https://open.er-api.com/v6/latest/USD";

function randomPrice() {
  return Math.random() * 10;
}

// Create an async thunk to fetch the products
export const fetchProductsList = createAsyncThunk(
  "ItemsList/fetchProductsList",
  async () => {
    try {
      const response1 = await fetch(productsListAPI);
      const response2 = await fetch(dollarValueAPI);

      if (!response1.ok || !response2.ok) {
        throw new Error("Network response was not ok");
      }

      const Productlist = await response1.json();
      const dollarValues = await response2.json();
      const dollarInRupees = dollarValues.rates.INR;

      const data =
        Productlist.map((item) => {
          const price =
            !item.price || item.price == 0
              ? `${Math.ceil(randomPrice() * dollarInRupees)}`
              : Math.ceil(item.price * dollarInRupees);

          const price_sign = "₹";
          const product_type =
            item.product_type === null ? "Not known" : item.product_type;
          const brand = item.brand === null ? "Brand not known" : item.brand;

          // Create a new object with the updated properties
          return {
            ...item,
            price,
            price_sign,
            product_type,
            brand,
          };
        });

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
