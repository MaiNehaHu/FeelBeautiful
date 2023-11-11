import React, { useState } from "react";
import "../style.css";

import image from "../../../Images/forLoginPage.png";
import google from "../../../Images/google.png";
import microSoft from "../../../Images/ms.png";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { takeInUser } from "../../../Store/Slices/LoginUserSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();


  const [nameInput, setNameInput] = useState("");
  const [registerMail, setRegisterMail] = useState("");
  const [registerPass, setRegisterPass] = useState("");

  function RegistrationValidation(registerMail, registerPass) {
    !registerMail ||
    !registerPass ||
    !registerMail.includes("@") ||
    !registerMail.includes(".")
      ? alert("You did not enter valid inputs")
      : dispatch(
          takeInUser({
            nameInput: nameInput,
            registerMail: registerMail,
            registerPass: registerPass,
          })
        ) && navigateTo("/LogIn");
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
    </React.Fragment>
  );
};

export default SignInPage;
