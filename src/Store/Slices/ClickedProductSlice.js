import { createSlice } from "@reduxjs/toolkit";

const Clicked_LS_Key = "ClickedProduct";
function getClickedProduct() {
  let ClickedProduct = sessionStorage.getItem(Clicked_LS_Key);

  if (ClickedProduct) {
    return JSON.parse(ClickedProduct);
  } else {
    return [];
  }
}

const ClickedProductSlice = createSlice({
  name: "Clicked/Selected Product",
  initialState: getClickedProduct(),
  reducers: {
    setClickedProduct(state, action) {
      sessionStorage.setItem(Clicked_LS_Key, JSON.stringify(action.payload));

      return action.payload;
    },
  },
});

export default ClickedProductSlice.reducer;
export const { setClickedProduct } = ClickedProductSlice.actions;
