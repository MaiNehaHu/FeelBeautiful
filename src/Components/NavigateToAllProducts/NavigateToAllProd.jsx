import React from "react";
import "./navigate.css";
import { Link } from "react-router-dom";

const NavigateToAllProd = () => {
  return (
    <React.Fragment>
      <div className="navigator-container">
        <Link to="/AllProducts" id="naviagteToAllProductsButton">Let's explore all products</Link>
      </div>
    </React.Fragment>
  );
};

export default NavigateToAllProd;
