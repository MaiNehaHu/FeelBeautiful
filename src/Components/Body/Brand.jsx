import React from "react";
import "./brand.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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

  let details = navigator.userAgent;
  let regexp = /android/i;
  let isMobileDevice = regexp.test(details);

  return (
    <React.Fragment>
      <div className="brands-card-container">
        {!list || list.length === 0 ? (
          isMobileDevice ? (
            <p
              id="please-wait"
              style={{ fontFamily: "monospace", textAlign: "center" }}
            >
              Trust me I tried alot😣. But my project is not 📵getting data in
              non-Desktop devices. Kindly, open it in you laptop💻.
            </p>
          ) : (
            <h2
              id="please-wait"
              style={{ fontFamily: "monospace", textAlign: "center" }}
            >
              Please wait...1 2 3
            </h2>
          )
        ) : (
          brandsWithMoreImages.map((brand,i) => (
            <div className="brand-card" key={i}>
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
                  to={`/Brand`}
                  onClick={() => {
                    getClickedBrand(brand);
                    sessionStorage.setItem(
                      "ClickedBrand",
                      JSON.stringify(brand)
                    );
                  }}
                >
                  <p>{brand.brandName.toUpperCase()}</p>
                </Link>
              </section>
            </div>
          ))
        )}
      </div>

      <div className="showAllButton">
        <Link to="/AllProducts">Show All</Link>
      </div>
    </React.Fragment>
  );
};

export default Brand;
