import React, { useState } from "react";
import "../LogIn&SignIn.scss";

import image from "../../../Images/forLoginPage.png";
import google from "../../../Images/google.png";
import microSoft from "../../../Images/ms.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { takeInUser } from "../../../Store/Slices/LoginUserSlice";

const SignInPage = () => {
  const className = "signInPage";
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
      <div className={className}>
        <div className="card">
          <section className={className + "__askLoginOrRegister"}>
            <button id="login" onClick={() => navigateTo("/LogIn")}>
              Old user? Click Here
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" className={className+"__girlsImage"} />
          </section>

          <section>
            <label htmlFor="name">Your Name:</label>
            <input
              required
              type="text"
              name="userName"
              className={className+"__inputUserName"}
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
              className={className+"__inputEmail"}
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
              className={className+"__inputPassword"}
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
              className={className+"__signinButton"}
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

          <section className={className+"__signInUsing"}>
            <label>Or continue with:</label>
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
