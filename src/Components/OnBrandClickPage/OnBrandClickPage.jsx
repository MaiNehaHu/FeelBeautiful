import React from "react";
import "./OnBrandClickPage.css";

import ProductCard from "../ProductCard/ProductCard";
import GoToTop from "../GoToTop/GoToTop";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OnBrandClickPage = () => {
  const list = useSelector((state) => {
    return state.Productslist.data;
  });

  const Brands = useSelector((state) => {
    return state.clickedBrand;
  });

  let brandToDisplay = list.filter(
    (brand) => brand.brand == Brands.brandName && brand.brand !== null
  );

  function randomPrice() {
    return Math.ceil(Math.random() * 10).toFixed(1);
  }

  brandToDisplay = brandToDisplay.map((item) => {
    const itemPrice =
      item.price === "0.0" || item.price === null ? randomPrice() : item.price;

    return {
      ...item,
      price: itemPrice,
    };
  });

  return (
    <React.Fragment>
      <h1 id="brand-name-heading">Brand: {Brands.brandName}</h1>
      <div id="product-container">
        {!Brands || Brands.length === 0 ? (
          <div>
            <h1 style={{ fontFamily: "monospace", textAlign: "center" }}>
              Please wait...1 2 3
            </h1>
          </div>
        ) : (
          brandToDisplay.map((item, i) => (
            <Link to={`/Product`} key={i}>
              <ProductCard item={item} />
            </Link>
          ))
        )}
      </div>
      
      <GoToTop />
    </React.Fragment>
  );
};

export default OnBrandClickPage;
