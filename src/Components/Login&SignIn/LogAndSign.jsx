import React, { useState } from "react";
import "./log.css";
import image from "../../Images/forLoginPage.png";
import google from "../../Images/google.png";
import microSoft from "../../Images/ms.png";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { takeInUser } from "../../Store/Slices/LoginUserSlice";
import { setLoginStatus } from "../../Store/Slices/LoginStatusSlice";
import { setFirstTime } from "../../Store/Slices/firstTimeUserStatusSlice";
import { setLoggedUserDetails } from "../../Store/Slices/LoggedUserDetailsSlice";

const LogAndSign = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const usersList = useSelector((state) => {
    return state.LoginUser;
  });

  const firstTime = useSelector((state) => {
    return state.firstTimeUserStatus;
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [nameInput, setNameInput] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [registerPass, setRegisterPass] = useState("");

  function RegistrationValidation(registerMail, registerPass) {
    !registerMail ||
    !registerPass ||
    !registerMail.includes("@") ||
    !registerMail.includes(".")
      ? alert("You did not enter valid ")
      : dispatch(
          takeInUser({
            nameInput: nameInput,
            registerMail: registerMail,
            registerPass: registerPass,
          })
        );
  }

  function goforLoginValidation() {
    !loginEmail || !loginPass
      ? alert("You did not enter  or Password")
      : checkUsersCredentais();
  }

  function checkUsersCredentais() {
    let userToLogin = usersList.find((user) => user.mailID === loginEmail);

    if (userToLogin) {
      if (userToLogin.password === loginPass) {
        dispatch(setLoginStatus(true));

        dispatch(setLoggedUserDetails({ userToLogin }));

        navigateTo(`/UserDashBoard/:${userToLogin.userName}`);
      } else {
        alert("Wrong password");
      }
    } else {
      alert("It seems you don't have an account.");
    }
  }

  return (
    <React.Fragment>
      <div
        className="registerContainer Container"
        style={{ display: !firstTime ? "none" : "flex" }}
      >
        <div className="card">
          <section className="AskLoginOrRegister">
            <button
              id="register"
              onClick={() => dispatch(setFirstTime(true))}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              New user?
            </button>

            <button
              id="login"
              onClick={() => dispatch(setFirstTime(false))}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Old user?
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
              name="name"
              id="input-userName"
              placeholder="Beautiful Name"
              onInput={(e) => setNameInput(e.target.value)}
            />
          </section>

          <section>
            <label htmlFor="email">Your MailID: </label>
            <input
              required
              onInput={(e) => setRegisterMail(e.target.value)}
              type="email"
              name="email"
              id="input-email"
              placeholder="yourName@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation(registerMail, registerPass);
                }
              }}
            />
          </section>

          <section>
            <label htmlFor="pass">Set Password: </label>
            <input
              required
              onInput={(e) => setRegisterPass(e.target.value)}
              type="password"
              name="password"
              id="input-password"
              placeholder="Secrete Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation(registerMail, registerPass);
                }
              }}
            />
          </section>

          <section>
            <button
              id="signinButton"
              onClick={() => RegistrationValidation(registerMail, registerPass)}
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
      {/**
       *
       *
       *
       */}
      <div
        className="loginContainer Container"
        style={{ display: firstTime ? "none" : "flex" }}
      >
        <div className="card">
          <section className="AskLoginOrRegister">
            <button
              id="register"
              onClick={() => dispatch(setFirstTime(true))}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              New user?
            </button>

            <button
              id="login"
              onClick={() => dispatch(setFirstTime(false))}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Old user?
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="email">Registered MailID: </label>
            <input
              required
              onInput={(e) => {
                setLoginEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="input-email"
              placeholder="yourName@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goforLoginValidation();
                }
              }}
            />
          </section>

          <section>
            <label htmlFor="pass">🫣Your Password: </label>
            <input
              required
              onInput={(e) => setLoginPass(e.target.value)}
              type="password"
              name="password"
              id="input-password"
              placeholder="Secrete Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goforLoginValidation();
                }
              }}
            />
          </section>

          <section>
            <a href="/FeelBeautiful/LoginOrSignIn">Forgot password?</a>
          </section>

          <section>
            <button id="loginButton" onClick={() => goforLoginValidation()}>
              Log me in
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
      )
    </React.Fragment>
  );
};

export default LogAndSign;
