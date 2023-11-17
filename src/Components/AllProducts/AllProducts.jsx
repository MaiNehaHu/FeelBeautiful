import React, { useEffect, useState } from "react";
import "./AllProducts.css";

import Filters from "../Filters/Filters";
import Image from "../../Images/noSearchResult.png";
import ProductCard from "../ProductCard/ProductCard";
import GoToTop from "../GoToTop/GoToTop";

import { fetchProductsList } from "../../Store/Slices/ProductsListSlice";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = ({}) => {
  const dispatch = useDispatch();

  const Productlist = useSelector((state) => {
    return state.Productslist.data;
  });

  const [list, setlist] = useState(Productlist);
  const [displayNotFoundImg, setDisplayNotFoundImg] = useState(false);

  /**Search Result list */
  function randomPrice() {
    return Math.ceil(Math.random() * 10).toFixed(1);
  }

  //Removing all glitches e.g. null values, 0 price of products
  const updatedList = list.map((item) => {
    const itemPrice =
      item.price === "0.0" || item.price === null
        ? `${randomPrice()}`
        : item.price;

    const productType =
      item.product_type === null ? "Not known" : item.product_type;
    const productBrand = item.brand === null ? "Brand not known" : item.brand;

    // Create a new object with the updated properties
    return {
      ...item,
      price: itemPrice,
      product_type: productType,
      brand: productBrand,
    };
  });

  //Getting search input from input field and setting the list
  function getSearchInput(input) {
    input = input.toLowerCase();

    dispatch(fetchProductsList());

    if (input === "") {
      setlist(Productlist);
    } else {
      const searchResult = Productlist.filter((item) => {
        return (
          item.name.includes(input) ||
          (item.brand && item.brand.includes(input)) ||
          item.product_type.includes(input) ||
          (item.price && item.price.includes(input)) ||
          (item.description && item.description.includes(input))
        );
      });

      setlist(searchResult);
    }
  }

  function getFilterInput(parameters) {
    const Filter = [...parameters];

    dispatch(fetchProductsList());

    const filterResult = Productlist.filter((item) => {
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

    setlist(filterResult);
  }

  function IconIsClicked() {
    setlist(Productlist);
  }

  useEffect(() => {
    if (list.length === 0) setDisplayNotFoundImg(true);
    else setDisplayNotFoundImg(false);
  }, [list]);

  return (
    <React.Fragment>
      <Filters
        getSearchInput={getSearchInput}
        getFilterInput={getFilterInput}
        IconIsClicked={IconIsClicked}
      />

      <h1 className="heading">All Products</h1>

      <div id="product-container">
        {updatedList.map((item, i) => (
          <Link to={`/Product`} key={i}>
            <ProductCard item={item} />
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
      <GoToTop />
    </React.Fragment>
  );
};

export default AllProducts;
