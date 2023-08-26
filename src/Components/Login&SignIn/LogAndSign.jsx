import React, { useEffect, useState } from "react";
import "./log.css";
import image from "../../Images/forLoginPage.png";
import google from "../../Images/google.png";
import microSoft from "../../Images/ms.png";
const User_ID_LS = "Users";

function getUsersCredentialsList() {
  let data = localStorage.getItem(User_ID_LS);

  if (data) {
    return JSON.parse(localStorage.getItem(User_ID_LS));
  } else {
    return [];
  }
}

const LogAndSign = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [loginEmail, setLoginEmail] = useState();
  const [loginPass, setLoginPass] = useState();

  const [registerMail, setRegisterMail] = useState();
  const [registerPass, setRegisterPass] = useState();

  const [displayNotification, setDisplayNotification] = useState(false);
  const [loggedInNotify, setLoggedinNotify] = useState(false);
  const [registeredNotify, setRegisteredNotify] = useState(false);

  const [usersCredenatialsList, setUsersCredenatialsList] = useState(
    getUsersCredentialsList()
  );

  function uniqueKey() {
    return `Be${Math.ceil(Math.random() * Math.pow(10, 4))}au${Math.ceil(
      Math.random() * Math.pow(10, 4)
    )}ty`;
  }

  function RegistrationValidation() {
    !registerMail ||
    !registerPass ||
    !registerMail.includes("@") ||
    !registerMail.includes(".")
      ? alert("You did not enter valid EmailID or Password")
      : setUsersCredenatialsInLS();
  }

  function setUsersCredenatialsInLS() {
    let alreadyRegistered = usersCredenatialsList.find((user) => {
      return user.emailID === registerMail;
    });

    if (alreadyRegistered) {
      alert("Account already exists. Please log-in");
    } else {
      setUsersCredenatialsList((prev) => {
        return [
          { key: uniqueKey(), emailID: registerMail, password: registerPass },
          ...prev,
        ];
      });

      setDisplayNotification(true);
      setRegisteredNotify(true);

      setTimeout(() => {
        setDisplayNotification(false);
        setRegisteredNotify(false);
      }, 3000);

      localStorage.setItem(User_ID_LS, JSON.stringify(usersCredenatialsList));
    }
  }

  function goforLoginValidation() {
    !loginEmail || !loginPass
      ? alert("You did not enter EmailID or Password")
      : checkUsersCredentaislInLS();
  }

  function checkUsersCredentaislInLS() {
    let userToLogin = usersCredenatialsList.find(
      (user) => user.emailID === loginEmail
    );

    if (userToLogin) {
      if (userToLogin.password === loginPass) {
        setDisplayNotification(true);
        setLoggedinNotify(true);

        setTimeout(() => {
          setDisplayNotification(false);
          setLoggedinNotify(false);
        }, 3000);
      } else {
        alert("Wrong password");
      }
    } else {
      alert("It seems you don't have an account.");
    }
  }

  useEffect(() => {
    localStorage.setItem(User_ID_LS, JSON.stringify(usersCredenatialsList));
  }, [usersCredenatialsList]);

  return (
    <React.Fragment>
      <div
        className="loginContainer Container"
        style={{ display: firstTime ? "none" : "flex" }}
      >
        <div className="card">
          <section className="AskLoginOrRegister">
            <button
              id="register"
              onClick={() => setFirstTime(true)}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              New user?
            </button>

            <button
              id="login"
              onClick={() => setFirstTime(false)}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Old user?
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="email">Registered Email: </label>
            <input
              onInput={(e) => setLoginEmail(e.target.value)}
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
            <label htmlFor="pass">Your Password: </label>
            <input
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
            <button id="loginButton" onClick={goforLoginValidation}>
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
      {/**
       *
       */}
      <div
        className="registerContainer Container"
        style={{ display: !firstTime ? "none" : "flex" }}
      >
        <div className="card">
          <section className="AskLoginOrRegister">
            <button
              id="register"
              onClick={() => setFirstTime(true)}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              New user?
            </button>

            <button
              id="login"
              onClick={() => setFirstTime(false)}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Old user?
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="email">Your Email: </label>
            <input
              onInput={(e) => setRegisterMail(e.target.value)}
              type="email"
              name="email"
              id="input-email"
              placeholder="yourName@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation();
                }
              }}
            />
          </section>

          <section>
            <label htmlFor="pass">Set Password: </label>
            <input
              onInput={(e) => setRegisterPass(e.target.value)}
              type="password"
              name="password"
              id="input-password"
              placeholder="Secrete Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  RegistrationValidation();
                }
              }}
            />
          </section>

          <br />
          <br />

          <section>
            <button id="signinButton" onClick={RegistrationValidation}>
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
      )
      {/**
       *Now notification section
       */}
      <div
        className="notification"
        style={{ display: displayNotification ? "block" : "none" }}
      >
        <div
          className="loginedIn"
          style={{ display: loggedInNotify ? "flex" : "none" }}
        >
          <p>Yaayy!! Welcome Back. You are in 😍</p>
        </div>

        <div
          className="signedIn"
          style={{ display: registeredNotify ? "flex" : "none" }}
        >
          {usersCredenatialsList.length > 0 && (
            <p>
              Yaayy!! You got a beauty ID
              {`{${usersCredenatialsList[0].key}}`}
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogAndSign;
