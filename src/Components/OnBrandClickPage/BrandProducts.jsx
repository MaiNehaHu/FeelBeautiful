import React, { useEffect, useState } from "react";
import "./brands.css";
import { Link } from "react-router-dom";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";

//storing in Local Storage from Body component
//Accessing here
const Brand_LS_Key = "ClickedBrand";
function getBrand() {
  let brand = localStorage.getItem(Brand_LS_Key);

  if (brand) {
    return JSON.parse(localStorage.getItem(Brand_LS_Key));
  } else {
    return [];
  }
}

const BrandProducts = ({ allBrandslist, clickedBrand, getClickedProduct }) => {
  const [gotClickedBrand, setGotClickedBrand] = useState(clickedBrand);

  //After refreshing
  useEffect(() => {
    if (gotClickedBrand === [] || gotClickedBrand.length === 0)
      setGotClickedBrand(getBrand());
  }, []);

  let brandToDisplay = allBrandslist.filter(
    (brand) => brand.brand == gotClickedBrand.brandName && brand.brand !== null
  );

  function randomPrice() {
    return Math.ceil(Math.random() * 10);
  }
  brandToDisplay.map((item) => {
    let itemPrice =
      item.price === "0.0" || item.price === null
        ? `${randomPrice()}.0`
        : Math.ceil(item.price);
    let PriceSign = item.price_sign === null ? "$" : item.price_sign;

    item.price_sign = PriceSign;
    item.price = itemPrice;
  });

  return (
    <React.Fragment>
      <h1 id="brand-name-heading">Brand: {clickedBrand.brandName}</h1>
      <div id="product-container">
        {gotClickedBrand.length === 0 || gotClickedBrand === [] ? (
          <div>
            <h1 style={{ fontFamily: "monospace", textAlign: "center" }}>
              Please wait...1 2 3
            </h1>
          </div>
        ) : (
          brandToDisplay.map((item, i) => (
            <Link to="/Product" key={i}>
              <div
                className="product-card"
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
                  <p>{item.brand}</p>
                </section>

                <section className="name">
                  <p> {item.name} </p>
                </section>
              </div>
            </Link>
          ))
        )}
      </div>
      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default BrandProducts;
