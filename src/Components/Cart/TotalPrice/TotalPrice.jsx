import React from "react";
import "./TotalPrice.css";
import { Link, useNavigate } from "react-router-dom";

let key = "Logged User";
function loggedUserStatus() {
  let details = localStorage.getItem(key);

  return details ? true : false;
}

const TotalPrice = ({ cartList }) => {
  const navigateTo = useNavigate();

  const logInStatus = loggedUserStatus();

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
      : logInStatus
      ? alert(
          "We haven't integrated payment right now. Hope you liked our website"
        )
      : navigateTo("/LoginOrSignIn");
  }

  return (
    <React.Fragment>
      <div className="total-amount-container">
        <p>Total Items in Cart: {cartList.length}</p>

        <button onClick={checkNumofItems}>
          <Link>Pay💸 ${finalPriceToPay}</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default TotalPrice;
