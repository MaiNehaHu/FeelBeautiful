import React from "react";
import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { setClickedProduct } from "../../Store/Slices/ClickedProductSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const className = "productCard";
 
  return (
    <React.Fragment>
      <div
        className={className}
        onClick={() => {
          dispatch(setClickedProduct(item));
        }}
      >
        <section className={className + "__price"}>
          <div>
            <span>{item.price_sign}</span>
            <span>{item.price}</span>
          </div>
          <p className={className + "__type"}>{item.product_type}</p>
        </section>

        <section className={className + "__photo"}>
          <img src={item.api_featured_image} alt={item.name} />
        </section>

        <section className={className + "__brand"}>
          <p>
            <q>{item.brand}</q>
          </p>
        </section>

        <section className={className + "__name"}>
          <p> {item.name} </p>
        </section>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
