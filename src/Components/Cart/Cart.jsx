import React from "react";
import "./cart.css";
import TotalPrice from "./TotalPrice/TotalPrice";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";

const Cart = ({ cart, deleteFromCart, incrementPrice, decrementPrice }) => {
  return (
    <React.Fragment>
      <ul className="cart-container">
        {cart.map((item, i) => (
          <li className="cart-product" key={i}>
            <section className="product-detail-in-cart">
              <div
                className="product-color"
                style={{ backgroundColor: `${item.color.hex_value}` }}
              ></div>

              <img src={item.api_featured_image} alt={item.name} />

              <p className="product-name">{item.name}</p>

              <p className="price-of-item">
                {item.price_sign}
                {item.price}
              </p>
            </section>

            <section id="actions-in-cart">
              <div className="buttons">
                <button
                  className="add-item"
                  onClick={() => incrementPrice(item)}
                >
                  +
                </button>

                <p className="count">{item.count}</p>

                <button
                  className="remove-item"
                  onClick={() => decrementPrice(item)}
                >
                  -
                </button>
              </div>

              <div className="calculated-price">
                {item.price_sign}
                {item.price * item.count}
              </div>

              <i
                className="fa fa-trash-o"
                onClick={() => {
                  deleteFromCart(item);
                }}
              ></i>
            </section>
          </li>
        ))}
      </ul>

      <TotalPrice cartList={cart} />

      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default Cart;
