import React from "react";
import "./brand.css";
import { Link } from "react-router-dom";

const Brand = ({ list, getClickedBrand }) => {
  //Getting all the brand names of all the products
  let allBrandNames = list.map((item) => {
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
      <div className="brands-card-container">
        {brandsWithMoreImages.map((brand) => (
          <div className="brand-card">
            <section className="brand-images">
              {brand.photos.slice(0, 3).map((photo, index) => (
                <img
                  draggable="false"
                  className={`index${index}`}
                  key={index}
                  src={photo}
                  alt={`${brand.brandName} ${index}`}
                />
              ))}
            </section>

            <section className="brand-name">
              <Link
                to="/selectedBrand"
                onClick={() => {
                  getClickedBrand(brand);
                  localStorage.setItem("ClickedBrand", JSON.stringify(brand));
                }}
              >
                <p>💠{brand.brandName}</p>
              </Link>
            </section>
          </div>
        ))}
      </div>

      <div className="showAllButton">
        <Link to="/AllProducts">Show All</Link>
      </div>
    </React.Fragment>
  );
};

export default Brand;
