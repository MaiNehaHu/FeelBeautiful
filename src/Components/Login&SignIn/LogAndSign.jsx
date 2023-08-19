import React, { useEffect, useState } from "react";
import "./log.css";
import image from "../../Images/forLoginPage.png";

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

  const [signinEmail, setSigninEmail] = useState();
  const [signinPass, setSigninPass] = useState();

  const [displayNotification, setDisplayNotification] = useState(false);
  const [loggedInNotify, setLoggedinNotify] = useState(false);
  const [signInNotify, setSigninNotify] = useState(false);

  const [usersCredenatialsList, setUsersCredenatialsList] = useState(
    getUsersCredentialsList()
  );

  function uniqueKey() {
    return `Be${Math.ceil(Math.random() * Math.pow(10, 4))}au${Math.ceil(
      Math.random() * Math.pow(10, 4)
    )}ty`;
  }

  function goForSigninValidation() {
    !signinEmail ||
    !signinPass ||
    !signinEmail.includes("@") ||
    !signinEmail.includes(".")
      ? alert("You did not enter valid EmailID or Password")
      : setUsersCredenatialsInLS();
  }

  function setUsersCredenatialsInLS() {
    let alreadyRegistered = usersCredenatialsList.find((user) => {
      return user.emailID === signinEmail;
    });

    if (alreadyRegistered) {
      alert("Account already exists. Please log-in");
    } else {
      setUsersCredenatialsList((prev) => {
        return [
          { key: uniqueKey(), emailID: signinEmail, password: signinPass },
          ...prev,
        ];
      });

      setDisplayNotification(true);
      setSigninNotify(true);

      setTimeout(() => {
        setDisplayNotification(false);
        setSigninNotify(false);
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
          <section className="AskLoginOrSignIn">
            <button
              id="signin"
              onClick={() => setFirstTime(true)}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              Register
            </button>

            <button
              id="login"
              onClick={() => setFirstTime(false)}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Log In
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
            <button id="loginButton" onClick={goforLoginValidation}>
              Log me in
            </button>
          </section>
        </div>
      </div>
      <div
        className="signinContainer Container"
        style={{ display: firstTime ? "flex" : "none" }}
      >
        <div className="card">
          <section className="AskLoginOrSignIn">
            <button
              id="signin"
              onClick={() => setFirstTime(true)}
              style={{ textDecoration: firstTime ? "underline" : "none" }}
            >
              Register
            </button>

            <button
              id="login"
              onClick={() => setFirstTime(false)}
              style={{ textDecoration: !firstTime ? "underline" : "none" }}
            >
              Log In
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>

          <section>
            <label htmlFor="email">Your Email: </label>
            <input
              onInput={(e) => setSigninEmail(e.target.value)}
              type="email"
              name="email"
              id="input-email"
              placeholder="yourName@gmail.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goForSigninValidation();
                }
              }}
            />
          </section>

          <section>
            <label htmlFor="pass">Set Password: </label>
            <input
              onInput={(e) => setSigninPass(e.target.value)}
              type="password"
              name="password"
              id="input-password"
              placeholder="Secrete Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goForSigninValidation();
                }
              }}
            />
          </section>

          <section>
            <button id="signinButton" onClick={goForSigninValidation}>
              Register me
            </button>
          </section>
        </div>
      </div>

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
          style={{ display: signInNotify ? "flex" : "none" }}
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
