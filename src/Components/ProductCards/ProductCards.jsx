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

  return (
    <div className={className}>
      <div className={className + "__scroll"}>
        {!Productlist || Productlist.length === 0 ? (
          <div className="loader"> </div>
        ) : (
          Productlist.slice(props.origin, props.end).map((item, i) => (
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
