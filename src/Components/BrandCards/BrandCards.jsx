import React from "react";
import "./BrandCards.scss";

import { useSelector } from "react-redux";
import BrandCard from "../BrandCard/BrandCard";

const Brand = (props) => {
  const className = "brandCards";

  const list = useSelector((state) => {
    return state.Productslist.data;
  });

  //Getting all the brand names of all the products
  let allBrandNames =
    list &&
    list.map((item) => {
      return item.brand;
    });

  //Getting the non-duplicate brand Names
  let brands = [...new Set(allBrandNames)];

  let brandAndImages = brands.map((brand) => {
    return {
      brandName: brand,
      photos: list
        .filter((item) => item.brand === brand && item.brand !== null)
        .map((item) => item.api_featured_image),
    };
  });

  //This list has more than one images
  let brandsWithMoreImages = brandAndImages.filter(
    (brandObj) => brandObj.photos.length >= 2
  );

  return (
    <React.Fragment>
      <div className={className}>
        <div className={className + "__scroll"}>
          {!list || list.length === 0 ? (
            <div className="loader"> </div>
          ) : (
            brandsWithMoreImages
              .slice(props.origin, props.end)
              .map((brand, i) => <BrandCard brand={brand} key={i} />)
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Brand;
