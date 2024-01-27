import React from "react";
import "./TotalPrice.scss";
import { Link, useNavigate } from "react-router-dom";

function loggedUserStatus() {
  let details = localStorage.getItem("Logged User");
  return !details || details.length <= 2 ? false : true;
}

const TotalPrice = ({ cartList }) => {
  const className = "totalPrice";
  const navigateTo = useNavigate();
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
      : loggedUserStatus()
      ? alert(
          "We haven't integrated payment right now. Hope you liked our website"
        )
      : navigateTo("/SignIn");
  }

  return (
    <React.Fragment>
      <div className={className}>
        <p>Total Items in Cart: {cartList.length}</p>

        <button onClick={checkNumofItems}>
          <Link>Pay💸 ${finalPriceToPay}</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default TotalPrice;
