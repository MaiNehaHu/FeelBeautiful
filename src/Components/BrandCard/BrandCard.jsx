import React from "react";
import "./BrandCard.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClickedBrand } from "../../Store/Slices/ClickedBrandSlice";

const BrandCard = (props) => {
  const className = "brandCard";
  const dispatch = useDispatch();

  return (
    <Link
      to={`/Brand`}
      onClick={() => {
        dispatch(setClickedBrand(props.brand));
      }}
      className="brandCard"
    >
      <section className={className + "__image"}>
        {props.brand.photos.slice(0, 3).map((photo, index) => (
          <img
            draggable="false"
            className={`index${index}`}
            key={index}
            src={photo}
            alt={`${props.brand.brandName} ${index}`}
          />
        ))}
      </section>

      <section className={className + "__name"}>
        <p>{props.brand.brandName.toUpperCase()}</p>
      </section>
    </Link>
  );
};

export default BrandCard;
