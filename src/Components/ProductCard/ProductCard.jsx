import React from "react";
import "./card.css";

const ProductCard = ({ item, getClickedProduct }) => {
  return (
    <React.Fragment>
      <div
        className="product-card"
        onClick={() => {
          getClickedProduct(item);
          sessionStorage.setItem("ClickedProduct", JSON.stringify(item));
        }}
      >
        <section className="price">
          <div>
            <span>{item.price_sign}</span>
            <span>{item.price}</span>
          </div>
          <p className="type">{item.product_type}</p>
        </section>

        <section className="photo">
          <img src={item.api_featured_image} alt={item.name} />
        </section>

        <section className="brand">
          <p>
            <q>{item.brand}</q>
          </p>
        </section>

        <section className="name">
          <p> {item.name} </p>
        </section>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
