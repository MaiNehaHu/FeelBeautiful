import React from "react";
import "./cart.scss";
import TotalPrice from "./TotalPrice/TotalPrice";
import GoToTop from "../../hooks/GoToTop/GoToTop";

import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../Store/Slices/CartListSlice";
import { incrementCount } from "../../Store/Slices/CartListSlice";
import { decrementCount } from "../../Store/Slices/CartListSlice";

const Cart = ({}) => {
  const className = "Cart";
  const dispatch = useDispatch();

  const cartList = useSelector((state) => {
    return state.CartList;
  });

  return (
    <React.Fragment>
      <ul className={className}>
        {cartList.map((item, i) => (
          <li className={className + "__cartProduct"} key={i}>
            <section className={className + "__cartProduct__detail"}>
              <div
                className={className + "__cartProduct__detail__color"}
                style={{ backgroundColor: `${item.color.hex_value}` }}
              ></div>

              <img
                src={item.api_featured_image}
                className={className + "__cartProduct__detail__image"}
                alt={item.name}
              />

              <p className={className + "__cartProduct__detail__name"}>
                {item.name}
              </p>

              <p className={className + "__cartProduct__detail__price"}>
                {item.price_sign}
                {item.price}
              </p>
            </section>

            <section className={className + "__actions"}>
              <div className={className + "__actions__buttons"}>
                <button
                  className={className + "__actions__buttons__addItem"}
                  onClick={() => dispatch(incrementCount(item))}
                >
                  +
                </button>

                <p className={className + "__count"}>{item.count}</p>

                <button
                  className={className + "__actions__buttons__removeItem"}
                  onClick={() => dispatch(decrementCount(item))}
                >
                  -
                </button>
              </div>

              <div className={className + "__calculatedPrice"}>
                {item.price_sign}
                {(item.price * item.count).toFixed(1)}
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

      <GoToTop />
    </React.Fragment>
  );
};

export default Cart;
