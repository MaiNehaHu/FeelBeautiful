import React, { useEffect, useState } from "react";
import "./AllProducts.scss";

import { useMediaQuery } from "@mui/material";
import Filters from "../Filters/Filters";
import Image from "../../Images/noSearchResult.png";
import ProductCard from "../ProductCard/ProductCard";
import GoToTop from "../../hooks/GoToTop/GoToTop";

import { fetchProductsList } from "../../Store/Slices/ProductsListSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = ({}) => {
  const ProductList = useSelector((state) => {
    return state.Productslist.data;
  });

  const [list, setlist] = useState(ProductList);
  const [displayNotFoundImg, setDisplayNotFoundImg] = useState(false);

  const className = "AllProducts";
  const dispatch = useDispatch();
  const is1000px = useMediaQuery("(min-width: 1000px)");

  /**Search Result list */
  function randomPrice() {
    return Math.ceil(Math.random() * 10).toFixed(1);
  }

  //Removing all glitches e.g. null values, 0 price of products
  const updatedList =
    list &&
    list.map((item) => {
      const price =
        item.price === "0.0" || item.price === null
          ? `${randomPrice()}`
          : item.price;
      const price_sign = item.price_sign === null ? "$" : item.price_sign;

      const product_type =
        item.product_type === null ? "Not known" : item.product_type;
      const brand = item.brand === null ? "Brand not known" : item.brand;

      // Create a new object with the updated properties
      return {
        ...item,
        price,
        price_sign,
        product_type,
        brand,
      };
    });

  //Getting search input from input field and setting the list
  function getSearchInput(input) {
    input = input.toLowerCase();

    dispatch(fetchProductsList());

    if (input === "") {
      setlist(ProductList);
    } else {
      const searchResult = ProductList.filter((item) => {
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

  function isWithinRange(value, range) {
    const [min, max] = range.toString().split("-").map(parseFloat);
    console.log(min, max);

    if (!isNaN(min) && !isNaN(max)) {
      return parseFloat(value) >= min && parseFloat(value) <= max;
    } else {
      console.error("Invalid or unexpected range format:", range);
      return false;
    }
  }

  function getFilterInput(parameters) {
    const Filter = [...parameters];
    dispatch(fetchProductsList());

    const filterResult =
      ProductList &&
      ProductList.filter((item) => {
        return Filter.every((filter) => {
          const { brand, product_type, price, priceRange } = filter;

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

          const priceRangeMatch = priceRange
            ? isWithinRange(item.price, priceRange)
            : true;

          return (
            brandMatch && productTypeMatch && priceMatch && priceRangeMatch
          );
        });
      });

    setlist(filterResult);
  }

  useEffect(() => {
    if (list && list.length === 0) setDisplayNotFoundImg(true);
    else setDisplayNotFoundImg(false);
  }, [list]);

  return (
    <React.Fragment>
      <div className={className}>
        <Filters
          getSearchInput={getSearchInput}
          getFilterInput={getFilterInput}
        />
        <div className={className + "__productContainer"}>
          {is1000px ? <h1 className="heading">All Products</h1> : ""}

          <div className="products">
            {updatedList &&
              updatedList.map((item, i) => (
                <Link to={`/Product`} key={i}>
                  <ProductCard item={item} />
                </Link>
              ))}

            {displayNotFoundImg ? (
              <div className="productCard">
                <section className="photo">
                  <img src={Image} alt="Not found" />
                </section>
              </div>
            ) : null}
          </div>
        </div>
        <GoToTop />
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
