import React, { useState } from "react";
import "../LogIn&SignIn.css";

import image from "../../../Images/forLoginPage.png";
import google from "../../../Images/google.png";
import microSoft from "../../../Images/ms.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUserDetails } from "../../../Store/Slices/LoggedUserDetailsSlice";

const LogInPage = () => {
  const className = "LogInPage";
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    loginEmail: "",
    loginPass: "",
  });

  const usersList = useSelector((state) => {
    return state.LoginUser;
  });

  function goforLoginValidation() {
    !loginCredentials.loginEmail || !loginCredentials.loginPass
      ? alert("You did not enter Email or Password")
      : checkUsersCredentais();
  }

  function checkUsersCredentais() {
    let userToLogin = usersList.find(
      (user) => user.mailID === loginCredentials.loginEmail
    );

    if (userToLogin) {
      if (userToLogin.password === loginCredentials.loginPass) {
        dispatch(setLoggedUserDetails({ userToLogin }));

        navigateTo(`/UserDashBoard/:${userToLogin.userName}`);
      } else {
        alert("Wrong password");
      }
    } else {
      alert("It seems you don't have an account.");

      //navigate to SignIn page
      setTimeout(() => {
        navigateTo("/SignIn");
      }, 1000);
    }
  }

  function handleLoginCredentials(e) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <React.Fragment>
      <div className={className + " Container"}>
        <form className="card">
          <section className={className + "__askLoginOrRegister"}>
            <button
              id="register"
              onClick={() => {
                navigateTo("/SignIn");
              }}
            >
              New user? Click here
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="email">Registered MailID: </label>
            <input
              required
              onInput={handleLoginCredentials}
              type="email"
              name="loginEmail"
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
              onInput={handleLoginCredentials}
              type="password"
              name="loginPass"
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
            <a href="#">Forgot password?</a>
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
        </form>
      </div>
    </React.Fragment>
  );
};

export default LogInPage;
