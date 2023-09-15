import React, { useState } from "react";
import "./total.css";
import { Link } from "react-router-dom";

const TotalPrice = ({ cartList }) => {
  const [linkTo, setLinkTo] = useState("/Cart");
  
  let priceList = [];

  cartList.map((item) => {
    return priceList.push(item.price * item.count);
  });

  /**Using reduce method to get sum of the products amount */
  let finalPriceToPay = priceList
    .reduce((curr, acc) => curr + acc, 0)
    .toFixed(2);

  function checkNumofItems() {
    cartList.length === 0
      ? alert("Add something to buy")
      : setLinkTo("/LoginOrSignIn");
  }

  return (
    <React.Fragment>
      <div className="total-amount-container">
        <p>Total Items in Cart: {cartList.length}</p>

        <button onClick={checkNumofItems}>
          <Link to={linkTo}>Pay💸 ${finalPriceToPay}</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default TotalPrice;
