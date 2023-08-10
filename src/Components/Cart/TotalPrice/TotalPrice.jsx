import React from "react";
import "./total.css";
import { Link } from "react-router-dom";

const TotalPrice = ({ cartList }) => {
  let priceList = [];
  cartList.map((item) => {
    return priceList.push(item.price * item.count);
  });

  /**Using reduce method to get sum of the products amount */
  let finalPriceToPay = priceList.reduce((curr, acc) => curr + acc, 0);

  return (
    <React.Fragment>
      <div className="total-amount-container">
        <p>Total Items in Cart: {cartList.length}</p>

        <button>
          {" "}
          <Link to="/LoginOrSignIn">Pay💸 ${finalPriceToPay} </Link>{" "}
        </button>
      </div>
    </React.Fragment>
  );
};

export default TotalPrice;
