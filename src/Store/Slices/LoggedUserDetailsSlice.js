import { createSlice } from "@reduxjs/toolkit";
import userImage from "../../Images/defaultUserImage.png";

const key = "Logged User";
function getUserDetails() {
  let details = localStorage.getItem(key);

  if (details) {
    return JSON.parse(details);
  } else {
    return { userName: "userName" };
  }
}

const LoggedUserDetailsSlice = createSlice({
  name: "Name of User",
  initialState: getUserDetails(),
  reducers: {
    setLoggedUserDetails(state, action) {
      const toReturn = { ...action.payload.userToLogin, userImage: userImage };

      localStorage.setItem(key, JSON.stringify(toReturn));
      return toReturn;
    },

    updateUserImage(state, action) {
      const toReturn = { ...state, userImage: action.payload };

      localStorage.setItem(key, JSON.stringify(toReturn));
      return toReturn;
    },

    updateUserAddress(state, action) {
      console.log(action.payload);
    },

    resetUserDetails(state, action) {
      const toReturn = { ...action.payload };

      localStorage.setItem(key, JSON.stringify(toReturn));
      return toReturn;
    },
  },
});

export default LoggedUserDetailsSlice.reducer;
export const { setLoggedUserDetails, updateUserImage, resetUserDetails } =
  LoggedUserDetailsSlice.actions;
