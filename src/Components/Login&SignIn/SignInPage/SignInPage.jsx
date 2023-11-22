import React, { useState } from "react";
import "../LogIn&SignIn.css";

import image from "../../../Images/forLoginPage.png";
import google from "../../../Images/google.png";
import microSoft from "../../../Images/ms.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { takeInUser } from "../../../Store/Slices/LoginUserSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [newUserDetails, setNewUserDetails] = useState({
    userName: "",
    userMail: "",
    userPassword: "",
  });

  function RegistrationValidation(mailID, password) {
    !mailID || !password || !mailID.includes("@")
      ? alert("You did not enter valid inputs")
      : dispatch(
          takeInUser({
            userName: newUserDetails.userName,
            mailID,
            password,
          })
        ) && navigateTo("/LogIn");
  }

  function handleUserDetailsInput(e) {
    setNewUserDetails({
      ...newUserDetails,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <React.Fragment>
      <div className="registerContainer Container">
        <div className="card">
          <section className="AskLoginOrRegister">
            <button id="login" onClick={() => navigateTo("/LogIn")}>
              Old user? Click Here
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="name">Your Name:</label>
            <input
              required
              type="text"
              name="userName"
              id="input-userName"
              placeholder="Beautiful Name"
              onChange={handleUserDetailsInput}
            />
          </section>

          <section>
            <label htmlFor="email">Your MailID: </label>
            <input
              required
              onChange={handleUserDetailsInput}
              type="email"
              name="userMail"
              id="input-email"
              placeholder="yourName@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation(
                    newUserDetails.userMail,
                    newUserDetails.userPassword
                  );
                }
              }}
            />
          </section>

          <section>
            <label htmlFor="pass">Set Password: </label>
            <input
              required
              onChange={handleUserDetailsInput}
              type="password"
              name="userPassword"
              id="input-password"
              placeholder="Secrete Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation(
                    newUserDetails.userMail,
                    newUserDetails.userPassword
                  );
                }
              }}
            />
          </section>

          <section>
            <button
              id="signinButton"
              onClick={() =>
                RegistrationValidation(
                  newUserDetails.userMail,
                  newUserDetails.userPassword
                )
              }
            >
              Register me
            </button>
          </section>

          <section id="sign-in-using">
            <label htmlFor="signInWithGoogle">Or continue with:</label>
            <button name="signInWithGoogle">
              <img src={google} alt="google icon" />
            </button>

            <button name="signInWithMS">
              <img src={microSoft} alt="MicroSoft icon" />
            </button>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignInPage;
