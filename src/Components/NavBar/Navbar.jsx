import React from "react";
import "./NavBar.scss";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = ({}) => {
  const cart = useSelector((state) => {
    return state.CartList;
  });
  
  const userName = useSelector((state) => {
    return state.LoggedUserDetails;
  }).userName;

  const is630px = useMediaQuery("(min-width: 630px)");
  const className = "navBar";

  return (
    <React.Fragment>
      <nav id="nav" className={className}>
        <section id="logo">
          <Link to="/">Feel Beautiful❤️</Link>
        </section>

        <section className={className + "__navigators"}>
          <Link to="/">
            {is630px ? "Home" : ""}
            🏡
          </Link>

          <Link to="/Cart">
            {is630px ? "Cart" : ""}
            🛒
            <sup id="cartCount">{cart.length}</sup>
          </Link>

          {!userName ? (
            <Link to="/SignIn" id="signIn">
              {is630px ? "Get in" : ""}
              🔏
            </Link>
          ) : (
            <Link to={`/UserDashBoard/:${userName}`} id="signIn">
              {is630px ? "Dashboard" : ""}
              <i className="fa fa-user" aria-hidden="true"></i>
            </Link>
          )}
        </section>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
