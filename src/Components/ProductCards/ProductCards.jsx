import React from "react";
import "./ProductCards.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCards = (props) => {
  const className = "ProductCards";

  const Productlist = useSelector((state) => {
    return state.Productslist.data;
  });

  /**Search Result list */
  function randomPrice() {
    return Math.ceil(Math.random() * 10).toFixed(1);
  }

  //Removing all glitches e.g. null values, 0 price of products
  const updatedList =  Productlist && Productlist.map((item) => {
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

  return (
    <div className={className}>
      <div className={className + "__scroll"}>
        {!Productlist || Productlist.length === 0 ? (
          <div className="loader"> </div>
        ) : (
          updatedList.slice(props.origin, props.end).map((item, i) => (
            <Link to={`/Product`} key={i}>
              <ProductCard item={item} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCards;
