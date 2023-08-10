import React, { useState } from "react";
import "./log.css";
import image from "../../Images/forLoginPage.png";

const LogAndSign = () => {
  const [firstTime, setFirstTime] = useState(true);

  return (
    <React.Fragment>
      <div
        className="loginContainer Container"
        style={{ display: firstTime ? "flex" : "none" }}
      >
        <div className="card">
          <section className="AskLoginOrSignIn">
            <button id="login" onClick={() => setFirstTime(true)}>
              Log In
            </button>
            <button id="signin" onClick={() => setFirstTime(false)}>
              Sign In
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>
          <section>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="input-email" />
          </section>

          <section>
            <label htmlFor="pass">Set Password: </label>
            <input type="password" name="password" id="input-password" />
          </section>

          <section>
            <button id="loginButton">Log In</button>
          </section>
        </div>
      </div>
      <div
        className="signinContainer Container"
        style={{ display: firstTime ? "none" : "flex" }}
      >
        <div className="card">
          <section className="AskLoginOrSignIn">
            <button id="login" onClick={() => setFirstTime(true)}>
              Log In
            </button>
            <button id="signin" onClick={() => setFirstTime(false)}>
              Sign In
            </button>
          </section>

          <section>
            <img src={image} alt="Girls" id="girls-image" />
          </section>
          <section>
            <label htmlFor="email">Registered Email: </label>
            <input type="email" name="email" id="input-email" />
          </section>

          <section>
            <label htmlFor="pass">Password: </label>
            <input type="password" name="password" id="input-password" />
          </section>

          <section>
            <button id="loginButton">Sign In</button>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogAndSign;
