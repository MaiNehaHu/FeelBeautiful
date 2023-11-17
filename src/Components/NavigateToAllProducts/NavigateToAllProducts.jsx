import React from "react";
import "./NavigateToAllProducts.css";
import { Link } from "react-router-dom";

const NavigateToAllProducts = () => {
  return (
    <React.Fragment>
      <div className="navigator-container">
        <Link to="/AllProducts" id="naviagteToAllProductsButton">Let's explore all products</Link>
      </div>
    </React.Fragment>
  );
};

export default NavigateToAllProducts;
