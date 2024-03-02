import "./App.scss";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./Components/Cart/Cart";
import NavBar from "./Components/NavBar/NavBar";
import Carousel from "./Components/Carousel/Carousel";
import BrandCards from "./Components/BrandCards/BrandCards";
import ProductCards from "./Components/ProductCards/ProductCards";
import AllProducts from "./Components/AllProducts/AllProducts";
import OnBrandClickPage from "./Components/OnBrandClickPage/OnBrandClickPage";
import OnProductClickPage from "./Components/OnProductClickPage/OnProductClickPage";
import LogInPage from "./Components/Login&SignIn/LogInPage/LogInPage";
import SignInPage from "./Components/Login&SignIn/SignInPage/SignInPage";
import UserDashboard from "./Components/Dashboard/UserDashboard";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

import { fetchProductsList } from "./Store/Slices/ProductsListSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const userName = useSelector((state) => {
    return state.LoggedUserDetails;
  }).userName;

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
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Carousel />

              <BrandCards origin={0} end={10} />
              <ProductCards origin={0} end={10} />
              <BrandCards origin={11} end={20} />
              <ProductCards origin={17} end={27} />
              <BrandCards origin={21} end={30} />
              <ProductCards origin={28} end={38} />
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
