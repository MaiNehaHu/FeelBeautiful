import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import OnProductClickPage from "./Components/OnProductClickPage/OnProductClickPage";
import Cart from "./Components/Cart/Cart";
import Navbar from "./Components/NavBar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import Brand from "./Components/Body/Brand";
import AllProducts from "./Components/AllProducts/AllProducts";
import OnBrandClickPage from "./Components/OnBrandClickPage/OnBrandClickPage";
import ErrorPage from "./Components/404ErrorPage.jsx/ErrorPage";
import NavigateToAllProd from "./Components/NavigateToAllProducts/NavigateToAllProd";
import LogInPage from "./Components/Login&SignIn/LogInPage/LogInPage";
import SignInPage from "./Components/Login&SignIn/SignInPage/SignInPage";
import UserDashboard from "./Components/Dashboard/UserDashboard";

import { fetchProductsList } from "./Store/Slices/ProductsListSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  let userName;
  const dispatch = useDispatch();

  /**Getting product list from API*/
  function init() {
    dispatch(fetchProductsList());
  }

  window.addEventListener("load", () => {
    init();
  });

  return (
    <BrowserRouter basename="/FeelBeautiful">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <NavigateToAllProd />
              <Carousel />
              <Brand />
            </React.Fragment>
          }
        />

        <Route
          path="/AllProducts"
          element={
            <React.Fragment>
              <AllProducts />
            </React.Fragment>
          }
        />

        {/**selectedBrand */}

        <Route
          path={`/Brand`}
          element={
            <React.Fragment>
              <OnBrandClickPage />
            </React.Fragment>
          }
        />
        
        <Route
          path={`/Product`}
          element={
            <React.Fragment>
              <OnProductClickPage />
            </React.Fragment>
          }
        />

        <Route
          path="/Cart"
          element={
            <React.Fragment>
              <Cart />
            </React.Fragment>
          }
        />

        <Route
          path="/LogIn"
          element={
            <React.Fragment>
              <LogInPage />
            </React.Fragment>
          }
        />

        <Route
          path="/SignIn"
          element={
            <React.Fragment>
              <SignInPage />
            </React.Fragment>
          }
        />

        <Route
          path={`/UserDashBoard/:${userName}`}
          element={
            <React.Fragment>
              <UserDashboard />
            </React.Fragment>
          }
        />

        <Route
          path="/*"
          element={
            <React.Fragment>
              <ErrorPage />
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
