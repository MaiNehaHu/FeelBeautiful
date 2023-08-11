import React, { useEffect, useState } from "react";
import "./filter.css";
import useSelectHook from "../../hooks/useSelectHook";

const Filters = ({
  getSearchInput,
  getFilterInput,
  IconIsClicked /**Coming from AllProducts.jsx */,
  list /**Coming from App.jsx */,
}) => {
  if (!list) return;

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(100);
  const [brand, setBrand] = useSelectHook("All");
  const [type, setType] = useSelectHook("All");
  const [topPixel, setTopPixel] = useState(0);

  let FilterToSend = [{ brand: brand, product_type: type, price: priceRange }];

  //Brand
  let allBrandNames = list.map((item) => {
    return item.brand;
  });
  //filtered the brands name bcz few that null name
  const brandNames = allBrandNames.filter((brandName) => {
    return brandName !== null;
  });

  //Type
  let allTypes = list.map((item) => {
    return item.product_type;
  });

  //Making the list with no duplicate
  let brands = [...new Set(brandNames)];
  let types = [...new Set(allTypes)];

  useEffect(() => {
    //Disappear input field when input field is not focused
    document.getElementById("search-input").addEventListener("focusout", () => {
      setShowSearchBar(false);
    });

    //Setting height of filters according to end of nav
    const handleResize = () => {
      setTopPixel(document.getElementById("filter").offsetHeight);
    };
    window.addEventListener("resize", handleResize);

    //Initial setup when the component mounts
    handleResize();

    //Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div id="filter">
        <div className="searching-tools">
          <div className="search">
            <i
              onClick={() => {
                showFilters
                  ? setShowSearchBar(false)
                  : setShowSearchBar(!showSearchBar);

                IconIsClicked();
              }}
              className="fa search-icon"
            >
              &#xf002;
            </i>

            <input
              style={{ display: showSearchBar ? "block" : "none" }}
              type="search"
              name="product"
              id="search-input"
              onInput={(e) => {
                getSearchInput(e.target.value);
              }}
            />
          </div>

          <div
            id="filter-show-button"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span>Filter</span>

            <i
              onClick={() => {
                showSearchBar
                  ? setShowFilters(false)
                  : setShowFilters(!showFilters);

                IconIsClicked();
              }}
              className="fa fa-bars more-icon"
            ></i>
          </div>
        </div>

        <div
          id="TotalfiltersContainer"
          style={{
            display: showFilters ? "flex" : "none",
            top: `${topPixel}px`,
          }}
          onMouseLeave={() => setShowFilters(false)}
        >
          <div id="filtersContainer">
            <section className="brand-input">
              <label htmlFor="brand">Brand: </label>
              <select {...setBrand} name="brand" id="brand-filter">
                <option value="All">All brands</option>

                {brands.map((brand, i) => (
                  <option value={brand} key={i}>
                    {brand}
                  </option>
                ))}
              </select>
            </section>

            <section className="type-input">
              <label htmlFor="type">Type: </label>
              <select {...setType} name="type" id="type-filter">
                <option value="All">All types</option>

                {types.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
              </select>
            </section>

            <section className="range-input">
              <label htmlFor="range-input">Price Range: </label>

              <input
                onInput={(e) => {
                  setPriceRange(e.target.value);
                }}
                type="range"
                min={1}
                max={100}
                step={0.5}
                defaultValue={100}
                name="proce-range"
                id="price-range"
              />
              <span id="range-filter">
                {priceRange === undefined
                  ? `00`
                  : priceRange < 10
                  ? `0${priceRange}`
                  : priceRange}
              </span>
            </section>
          </div>

          <button
            id="applyButton"
            onClick={() => {
              getFilterInput(FilterToSend);
              setShowFilters(false);
            }}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filters;
