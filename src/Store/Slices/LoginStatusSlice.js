import { createSlice } from "@reduxjs/toolkit";

const Key = "Login Status";

function getLoginStatus() {
  let status = localStorage.getItem(Key);

  if (status) {
    return JSON.parse(status);
  } else {
    return false;
  }
}

const LoginStatusSlice = createSlice({
  name: "Tell that if  is Logged in or not",
  initialState: getLoginStatus(),
  reducers: {
    setLoginStatus(state, action) {
      localStorage.setItem(Key, JSON.stringify(action.payload));

      return action.payload;
    },
  },
});

export default LoginStatusSlice.reducer;
export const { setLoginStatus } = LoginStatusSlice.actions;
