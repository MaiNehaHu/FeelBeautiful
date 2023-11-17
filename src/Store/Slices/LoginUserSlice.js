import { createSlice } from "@reduxjs/toolkit";

const User_ID_LS = "Logged Users List";
function getUsersCredentialsList() {
  let data = localStorage.getItem(User_ID_LS);

  if (data) {
    return JSON.parse(localStorage.getItem(User_ID_LS));
  } else {
    return [];
  }
}

function uniqueKey() {
  return `${Math.ceil(Math.random() * Math.pow(10, 4))}FB${Math.ceil(
    Math.random() * Math.pow(10, 4)
  )}`;
}

const LoginUserSlice = createSlice({
  name: "Loggined user details",

  initialState: getUsersCredentialsList(),
  
  reducers: {
    takeInUser(state, action) {
      const { userName, mailID, password } = action.payload;

      let alreadyRegistered = state.find((user) => {
        return user.mailID === mailID;
      });

      if (alreadyRegistered) {
        alert("Account already exists. Please log-in");
      } else {
        const newUser = {
          key: uniqueKey(),
          userName,
          mailID,
          password,
        };

        const updatedList = [newUser, ...state];
        localStorage.setItem(User_ID_LS, JSON.stringify(updatedList));

        state.push(newUser);
      }
    },
  },
});

export default LoginUserSlice.reducer;
export const { takeInUser } = LoginUserSlice.actions;
