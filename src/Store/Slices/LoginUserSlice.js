import { createSlice } from "@reduxjs/toolkit";

const User_ID_LS = "Users List";
function getUsersCredentialsList() {
  let data = localStorage.getItem(User_ID_LS);

  if (data) {
    return JSON.parse(localStorage.getItem(User_ID_LS));
  } else {
    return [];
  }
}

function uniqueKey() {
  return `Be${Math.ceil(Math.random() * Math.pow(10, 4))}au${Math.ceil(
    Math.random() * Math.pow(10, 4)
  )}ty`;
}

const LoginUserSlice = createSlice({
  name: "Loggined user details",

  initialState: getUsersCredentialsList(),
  
  reducers: {
    takeInUser(state, action) {
      const { nameInput, registerMail, registerPass } = action.payload;

      let alreadyRegistered = state.find((user) => {
        return user.mailID === registerMail;
      });

      if (alreadyRegistered) {
        alert("Account already exists. Please log-in");
      } else {
        const newUser = {
          key: uniqueKey(),
          userName: nameInput,
          mailID: registerMail,
          password: registerPass,
        };

        const updatedList = [newUser, ...state];
        localStorage.setItem(User_ID_LS, JSON.stringify(updatedList));

        state.push(newUser);

        alert("Now, you can login to your account")
      }
    },
  },
});

export default LoginUserSlice.reducer;
export const { takeInUser } = LoginUserSlice.actions;
