import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
import LogAndSign from "./Components/Login&SignIn/logAndSign";

const url = "http://makeup-api.herokuapp.com/api/v1/products.json";

const listLocalStorageKey = "Total-list";
function getList() {
  let list = localStorage.getItem("Total-list");

  if (list) {
    return JSON.parse(localStorage.getItem("Total-list"));
  } else {
    return [];
  }
}
/**Take cart list from Local Storage */
const Cart_LS_Key = "CartList";
function getCartList() {
  let list = localStorage.getItem(Cart_LS_Key);
  if (list) {
    return JSON.parse(localStorage.getItem(Cart_LS_Key));
  } else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(getList());

  const [clickedProduct, setClickedProduct] = useState([]);
  const [clickedBrand, setClickedBrand] = useState([]);
  const [cart, setCart] = useState(getCartList());
  const [cartCount, setCartCount] = useState(cart.length);

  //Don't know why we are using but working👍🏻
  const [productInCartCount, setProductInCartCount] = useState(1);

  /**Copy of the cart list to use multiple times */
  let newCartList = [...cart];

  /**Getting product from API */
  window.onload = () => {
    function ajax() {
      let XHTMLReq = new XMLHttpRequest();
      XHTMLReq.open("GET", url, true);

      XHTMLReq.onload = () => {
        if (XHTMLReq.status === 200 && XHTMLReq.status < 300) {
          console.log("All good at API");
        }
      };
    }
    ajax();
  };

  window.addEventListener("load", function () {
    init();
  });

   /**Getting product list from API*/
  function init() {
    getProductsList();
  }

  const getProductsList = () => {
    axios
      .get(url)
      .then(({ data }) => {
        setList(data);
      })
      .catch(() => {
        //reload if got rerror
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      });
  };

 


  /**On click on an brand showing all the products */
  function getClickedBrand(brand) {
    setClickedBrand(brand);
  }

  /**On click on an item showing the entire details */
  function getClickedProduct(productDetails) {
    setClickedProduct(productDetails);
  }

  /**Adding to cart and giving unique key */
  function uniqueKey() {
    return Math.ceil(Math.random() * Math.pow(10, 10));
  }
  function addToCart(product, color) {
    //if color is null or undefined. Give it white
    color =
      color === null || color === undefined || !color
        ? {
            hex_value: "#ffffff00",
            colour_name: "White",
            border: "3px solid white",
          }
        : color;

    let sameOne = newCartList.find(
      (item) =>
        item.name === product.name &&
        item.color.colour_name === color.colour_name
    );

    if (!sameOne) {
      setCart((prev) => {
        return [
          { key: uniqueKey(), count: 1, color: color, ...product },
          ...prev,
        ];
      });

      setCartCount(cart.length + 1);
    } else {
      sameOne.count++;
      localStorage.setItem(Cart_LS_Key, JSON.stringify(cart));
    }
  }

  /**Deleting a item and Updating cart list */
  function deleteFromCart(productToRemoveFromCart) {
    let filteredList = newCartList.filter(
      (listItem) => listItem.key !== productToRemoveFromCart.key
    );

    setTimeout(() => {
      setCart(filteredList);
    }, 500);

    setCartCount(filteredList.length);
  }

  /**Incrementing no.of item count*/
  function incrementPrice(item) {
    let desiredProduct = newCartList.find(
      (listItem) => listItem.key === item.key
    );
    desiredProduct.count = desiredProduct.count + 1;

    setProductInCartCount(desiredProduct.count);
    localStorage.setItem(Cart_LS_Key, JSON.stringify(cart));
  }

  /**Decrementing no.of item count*/
  function decrementPrice(item) {
    let desiredProduct = newCartList.find(
      (listItem) => listItem.key === item.key
    );
    desiredProduct.count =
      desiredProduct.count <= 1 ? 1 : desiredProduct.count - 1;

    setProductInCartCount(desiredProduct.count);
    localStorage.setItem(Cart_LS_Key, JSON.stringify(cart));
  }

  /**Storing in Local Storage */
  useEffect(() => {
    localStorage.setItem(Cart_LS_Key, JSON.stringify(cart));
    /**localStorage.setItems("key", "value")*/

    localStorage.setItem(listLocalStorageKey, JSON.stringify(list));
  }, [cart, list]);

  /**Prevent consoling */
  // window.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  return (
    <BrowserRouter basename="/FeelBeautifull">
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <NavigateToAllProd />
              <Carousel />
              <Brand list={list} getClickedBrand={getClickedBrand} />
            </React.Fragment>
          }
        />

        <Route
          path="/AllProducts"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <AllProducts list={list} getClickedProduct={getClickedProduct} />
            </React.Fragment>
          }
        />

        {/**selectedBrand */}

        <Route
          path="/selectedBrand"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <BrandProducts
                allBrandslist={list}
                clickedBrand={clickedBrand}
                getClickedProduct={getClickedProduct}
              />
            </React.Fragment>
          }
        />
        <Route
          path="/Product"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <OnClickPage clicked={clickedProduct} addToCart={addToCart} />
            </React.Fragment>
          }
        />

        <Route
          path="/Cart"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <Cart
                cart={cart}
                deleteFromCart={deleteFromCart}
                incrementPrice={incrementPrice}
                decrementPrice={decrementPrice}
              />
            </React.Fragment>
          }
        />

        <Route
          path="/LoginOrSignIn"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <LogAndSign />
            </React.Fragment>
          }
        />

        <Route
          path="/*"
          element={
            <React.Fragment>
              <Navbar count={cartCount} />
              <ErrorPage />
            </React.Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
