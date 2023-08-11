import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const Navbar = ({ count }) => {
  return (
    <React.Fragment>
      <div id="nav">
        <section id="logo">
          <Link to="/">Feel Beautiful❤️</Link>
        </section>

        <section id="navs">
          <Link to="/">Home🏡</Link>

          <Link to="/Cart">
            Cart🛒<sup id="cartCount">{count}</sup>
          </Link>

          <Link to="/LoginOrSignIn" id="logInOrSignIn">
            Sign in/Log in🔏
          </Link>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
