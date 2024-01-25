import React from "react";
import "./OnBrandClickPage.scss";
import ProductCard from "../ProductCard/ProductCard";
import GoToTop from "../../hooks/GoToTop/GoToTop";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const OnBrandClickPage = () => {
  const className = "onBrandClickPage";
  const list = useSelector((state) => {
    return state.Productslist.data;
  });

  const Brands = useSelector((state) => {
    return state.clickedBrand;
  });

  let brandToDisplay = list
    .filter((brand) => brand.brand == Brands.brandName && brand.brand !== null)
    .map((item) => {
      const itemPrice =
        item.price === "0.0" || item.price === null
          ? randomPrice()
          : item.price;

      return {
        ...item,
        price: itemPrice,
      };
    });

  function randomPrice() {
    return Math.ceil(Math.random() * 10).toFixed(1);
  }

  return (
    <React.Fragment>
      <div className={className}>
        <header>
          <Link to="/">
            <IoChevronBackCircleSharp className="backBtn" />
          </Link>

          <h1 id="brand-name-heading">Brand: {Brands.brandName}</h1>
        </header>

        <div className="products">
          {!Brands || Brands.length === 0 ? (
            <h2 style={{ fontFamily: "monospace", textAlign: "center" }}>
              Please wait...1 2 3
            </h2>
          ) : (
            brandToDisplay.map((item, i) => (
              <Link to={`/Product`} key={i}>
                <ProductCard item={item} />
              </Link>
            ))
          )}
        </div>
      </div>

      <GoToTop />
    </React.Fragment>
  );
};

export default OnBrandClickPage;
