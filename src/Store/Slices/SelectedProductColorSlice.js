import { createSlice } from "@reduxjs/toolkit";

const selectedProductColorSlice = createSlice({
  name: "Selected/Clicked Product Color",
  initialState: [],
  reducers: {
    changeColor: (state, action) => {

      return action.payload;
    },
  },
});

export default selectedProductColorSlice.reducer;
export const { changeColor } = selectedProductColorSlice.actions;

