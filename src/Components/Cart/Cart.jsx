import React from "react";
import "./cart.css";
import TotalPrice from "./TotalPrice/TotalPrice";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";

import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../Store/Slices/CartListSlice";
import { incrementCount } from "../../Store/Slices/CartListSlice";
import { decrementCount } from "../../Store/Slices/CartListSlice";

const Cart = ({}) => {
  const dispatch = useDispatch();

  const cartList = useSelector((state) => {
    return state.CartList;
  });

  return (
    <React.Fragment>
      <ul className="cart-container">
        {cartList.map((item, i) => (
          <li className="cart-product" key={i}>
            <section className="product-detail-in-cart">
              <div
                className="product-color"
                style={{ backgroundColor: `${item.color.hex_value}` }}
              ></div>

              <img src={item.api_featured_image} alt={item.name} />

              <p className="product-name">{item.name}</p>

              <p className="price-of-item">
                Rs. {item.color.price}
              </p>
            </section>

            <section id="actions-in-cart">
              <div className="buttons">
                <button
                  className="add-item"
                  onClick={() => dispatch(incrementCount(item))}
                >
                  +
                </button>

                <p className="count">{item.count}</p>

                <button
                  className="remove-item"
                  onClick={() => dispatch(decrementCount(item))}
                >
                  -
                </button>
              </div>

              <div className="calculated-price">
                {item.price_sign}
                {(item.price * item.count).toFixed(2)}
              </div>

              <i
                className="fa fa-trash-o"
                onClick={() => {
                  dispatch(deleteFromCart(item));
                }}
              ></i>
            </section>
          </li>
        ))}
      </ul>

      <TotalPrice cartList={cartList} />

      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default Cart;
