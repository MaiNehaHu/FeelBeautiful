import React from "react";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import { setClickedProduct } from "../../Store/Slices/ClickedProductSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
 
  return (
    <React.Fragment>
      <div
        className="productCard"
        onClick={() => {
          dispatch(setClickedProduct(item));
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
