import React, { useEffect, useState } from "react";
import "./Filters.scss";

import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import useSelectHook from "../../hooks/useSelectHook";

const Filters = ({ getSearchInput, getFilterInput }) => {
  const [price, setPrice] = useState(100);
  const [priceRange, setPriceRange] = useSelectHook("0-1000");
  const [brand, setBrand] = useSelectHook("All");
  const [type, setType] = useSelectHook("All");

  const className = "filter";
  const is1000px = useMediaQuery("(min-width: 1000px)");
  const is650px = useMediaQuery("(min-width: 650px)");
  let FilterToSend = [{ brand, product_type: type, priceRange, price }];

  const list = useSelector((state) => {
    return state.Productslist.data;
  });

  const brandNames =
    list &&
    list
      .map((item) => {
        return item.brand;
      })
      .filter((brandName) => {
        return brandName !== null;
      });

  //Type
  let allTypes =
    list &&
    list.map((item) => {
      return item.product_type;
    });

  //Price ranges
  let priceRangeList = [
    "100-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700"
  ];

  //Making the list with no duplicate
  let brands = [...new Set(brandNames)];
  let types = [...new Set(allTypes)];

  useEffect(() => {
    if (!is1000px) {
      getFilterInput(FilterToSend);
    }
  }, [brand, priceRange, type]);

  return (
    <React.Fragment>
      <div className={className}>
        {is1000px ? (
          <div className={className + "__sideBar"}>
            <div className={className + "__sideBar__searchBar"}>
              <input
                type="search"
                name="product"
                id="search-input"
                placeholder="Search here"
                onKeyUp={(e) => getSearchInput(e.target.value)}
              />
            </div>

            <section className={className + "__sideBar__brandInput"}>
              <select
                {...setBrand}
                name="brand"
                className={className + "__brandFilter"}
              >
                <option value="All">All brands</option>

                {brands.map((brand, i) => (
                  <option value={brand} key={i}>
                    {brand}
                  </option>
                ))}
              </select>
            </section>

            <section className={className + "__sideBar__typeInput"}>
              <select
                {...setType}
                name="type"
                className={className + "__typeFilter"}
              >
                <option value="All">All types</option>

                {types.map((type, i) => (
                  <option value={type} key={i}>
                    {type}
                  </option>
                ))}
              </select>
            </section>

            <section className={className + "__sideBar__rangeInput"}>
              <label htmlFor="range-input">Price: </label>

              <input
                onInput={(e) => {
                  setPrice(e.target.value);
                }}
                type="range"
                min={1}
                max={1000}
                step={10}
                defaultValue={100}
                name="price-range"
                id="price-range"
              />
              <span className={className + "__rangeFilter"}>
                {price < 10 ? `0${price}` : price}
              </span>
            </section>

            <button
              id="applyButton"
              onClick={() => {
                getFilterInput(FilterToSend);
              }}
            >
              Apply Filter
            </button>
          </div>
        ) : (
          <div className={className + "__topBar"}>
            {is650px ? <h1 className="heading">All Products</h1> : ""}

            <section className={className + "__topBar__brandInput"}>
              <select
                {...setBrand}
                name="brand"
                className={className + "__brandFilter"}
              >
                <option value="All">All brands</option>

                {brands.map((brand, i) => (
                  <option value={brand} key={i}>
                    {brand}
                  </option>
                ))}
              </select>
            </section>

            <section className={className + "__topBar__typeInput"}>
              <select
                {...setType}
                name="type"
                className={className + "__typeFilter"}
              >
                <option value="All">All types</option>

                {types.map((type, i) => (
                  <option value={type} key={i}>
                    {type}
                  </option>
                ))}
              </select>
            </section>

            <section className={className + "__topBar__priceRangeInput"}>
              <select
                {...setPriceRange}
                name="priceRange"
                className={className + "__priceRangeFilter"}
              >
                <option value="0-1000">All Price</option>

                {priceRangeList.map((range, i) => (
                  <option value={range} key={i}>
                    {range}
                  </option>
                ))}
              </select>
            </section>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Filters;
