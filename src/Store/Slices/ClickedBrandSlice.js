import { createSlice } from "@reduxjs/toolkit";

//storing in Local Storage from Body component
//Accessing here
const Brand_LS_Key = "ClickedBrand";
function getBrand() {
  let brand = sessionStorage.getItem(Brand_LS_Key);

  if (brand) {
    return JSON.parse(brand);
  } else {
    return [];
  }
}

const clickedBrandSlice = createSlice({
  name: "Clicked/Selected Brand",
  initialState: getBrand(),
  reducers: {
    setClickedBrand(state, action) {
      sessionStorage.setItem(Brand_LS_Key, JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export default clickedBrandSlice.reducer;
export const { setClickedBrand } = clickedBrandSlice.actions;
