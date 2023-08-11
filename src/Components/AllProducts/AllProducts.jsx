import React, { useEffect, useState } from "react";
import "./body.css";
import { Link } from "react-router-dom";
import Image from "../../Images/noSearchResult.png";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";
import Filters from "../Filters/Filters";

function getList() {
  let list = localStorage.getItem("Total-list");

  if (list) {
    return JSON.parse(localStorage.getItem("Total-list"));
  } else {
    return [];
  }
}

const AllProducts = ({ getClickedProduct, list }) => {
  const [productsList, setProductsList] = useState(getList());
  const [displayNotFoundImg, setDisplayNotFoundImg] = useState(false);

  /**Search Result list */
  function randomPrice() {
    return Math.ceil(Math.random() * 10);
  }

  //Removing all glitches e.g. null values, 0 price of products

  productsList.map((item) => {
    const itemPrice =
      item.price === "0.0" || item.price === null
        ? `${randomPrice()}.0`
        : item.price;

    const PriceSign = item.price_sign === null ? "$" : item.price_sign;
    const productType =
      item.product_type === null ? "Not known" : item.product_type;
    const productBrand = item.brand === null ? "Brand not known" : item.brand;

    item.price = itemPrice;
    item.price_sign = PriceSign;
    item.product_type = productType;
    item.brand = productBrand;
  });

  //Getting search input from input field and setting the list
  function getSearchInput(input) {
    input = input.toLowerCase();

    if (input === "") {
      setProductsList(list);
    } else {
      const newList = [...productsList];

      const searchResult = newList.filter((item) => {
        return (
          item.name.includes(input) ||
          item.brand.includes(input) ||
          item.product_type.includes(input)
        );
      });

      setProductsList(searchResult);
    }
  }

  function getFilterInput(parameters) {
    const Filter = [...parameters];
    const newList = [...productsList];

    const filterResult = newList.filter((item) => {
      return Filter.every((filter) => {
        const { brand, product_type, price } = filter;

        const brandMatch =
          brand === "All" ? true : brand ? item.brand === brand : true;

        const productTypeMatch =
          product_type === "All"
            ? true
            : product_type
            ? item.product_type === product_type
            : true;

        const priceMatch = price
          ? parseFloat(item.price) <= parseFloat(price)
          : true;

        return brandMatch && productTypeMatch && priceMatch;
      });
    });

    setProductsList(filterResult);
  }

  function IconIsClicked() {
    setProductsList(list);
  }

  useEffect(() => {
    if (productsList.length === 0) setDisplayNotFoundImg(true)
    else setDisplayNotFoundImg(false)
  }, [productsList]);

  return (
    <React.Fragment>
      <Filters
        list={list}
        getSearchInput={getSearchInput}
        getFilterInput={getFilterInput}
        IconIsClicked={IconIsClicked}
      />

      <h1 className="heading">All Products</h1>

      <div id="product-container">
        {productsList.map((item, i) => (
          <Link to="/Product">
            <div
              className="product-card"
              key={i}
              onClick={() => {
                getClickedProduct(item);
                localStorage.setItem("ClickedProduct", JSON.stringify(item));
              }}
            >
              <section className="price">
                <div>
                  <span>{item.price_sign}</span>
                  <span>{item.price}</span>
                </div>
                <p className="type">{item.product_type}</p>
              </section>

              <section className="photo">
                <img src={item.api_featured_image} alt={item.name} />
              </section>

              <section className="brand">
                <p>
                  <q>{item.brand}</q>
                </p>
              </section>

              <section className="name">
                <p> {item.name} </p>
              </section>
            </div>
          </Link>
        ))}

        <div className="product-card">
          <section className="photo">
            <img
              src={Image}
              alt="Not found"
              style={{ display: displayNotFoundImg ? "block" : "none" }}
            />
          </section>
        </div>
      </div>
      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default AllProducts;
