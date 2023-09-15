import React from "react";
import "./brands.css";

import ProductCard from "../ProductCard/ProductCard";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BrandProducts = () => {
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
    const PriceSign = item.price_sign || "$";

    return {
      ...item,
      price_sign: PriceSign,
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
      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default BrandProducts;
