import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import OnClickPage from "./Components/OnProductClickPage/OnClickPage";
import Cart from "./Components/Cart/Cart";
import Navbar from "./Components/NavBar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import Brand from "./Components/Body/Brand";
import AllProducts from "./Components/AllProducts/AllProducts";
import BrandProducts from "./Components/OnBrandClickPage/brandProducts";
import ErrorPage from "./Components/404ErrorPage.jsx/ErrorPage";
import NavigateToAllProd from "./Components/NavigateToAllProducts/NavigateToAllProd";
import LogAndSign from "./Components/Login&SignIn/LogAndSign";
import UserDashboard from "./Components/Dashboard/UserDashboard";

import { fetchProductsList } from "./Store/Slices/ProductsListSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const userName = useSelector((state) => {
    return state.LoggedUserDetails;
  }).userName;

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
              <BrandProducts />
            </React.Fragment>
          }
        />
        <Route
          path={`/Product`}
          element={
            <React.Fragment>
              <OnClickPage />
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
          path="/LoginOrSignIn"
          element={
            <React.Fragment>
              <LogAndSign />
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
