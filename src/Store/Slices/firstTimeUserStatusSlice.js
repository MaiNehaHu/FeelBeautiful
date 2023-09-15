import { createSlice } from "@reduxjs/toolkit";

const firstTimeUserStatusSlice = createSlice({
  name: "To show Login page or Signin page",
  initialState: true,
  reducers: {
    setFirstTime(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export default firstTimeUserStatusSlice.reducer;
export const { setFirstTime } = firstTimeUserStatusSlice.actions;
