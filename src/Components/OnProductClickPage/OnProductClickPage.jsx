import "./OnProductClickPage.css";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import GoToTop from "../GoToTop/GoToTop";
import { changeColor } from "../../Store/Slices/SelectedProductColorSlice";
import { addToCart } from "../../Store/Slices/CartListSlice";

const OnProductClickPage = ({}) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.ClickedProduct;
  });

  const ProductToDisplay = { ...productDetails };

  const selectedColor = useSelector((state) => {
    return state.selectedProductColor;
  });
  
  /**Giving border to selected and not selected color */
  if (
    selectedColor !== null &&
    productDetails.product_colors &&
    productDetails.product_colors.length > 0
  ) {
    ProductToDisplay.product_colors = ProductToDisplay.product_colors.map(
      (colors) => ({
        ...colors,
        border: "3px solid white",
      })
    );

    // Setting black border to the selected color
    let clickedColor = ProductToDisplay.product_colors.find(
      (Procolor) => Procolor.hex_value === selectedColor.hex_value
    );

    if (clickedColor) {
      clickedColor.border = "3px solid black";
    }
  }

  useEffect(() => {
    dispatch(changeColor(ProductToDisplay.product_colors[0]));
  }, []);

  return (
    <React.Fragment>
      {!productDetails ? (
        <h1 style={{ fontFamily: "monospace", textAlign: "center" }}>
          Please wait...1 2 3
        </h1>
      ) : (
        <div className="product-details-onClick">
          <div id="selectedProductImage">
            <img
              src={ProductToDisplay.api_featured_image}
              alt={ProductToDisplay.name}
            />
          </div>

          <div id="selectedProductDetails">
            <section>
              <p id="selectedProductName">
                {ProductToDisplay.name.toUpperCase()}
              </p>
              <p id="productType">Type: {ProductToDisplay.product_type}</p>
              <p id="selectedProductBrand">Brand: {ProductToDisplay.brand}</p>
            </section>

            <section id="selectedProductPrice">
              <p>
                <span>{ProductToDisplay.price_sign} </span>
                <span>{ProductToDisplay.price}</span>
              </p>
            </section>

            <section id="productDescription">
              <details>
                <summary style={{ cursor: "pointer" }}>
                  Details of product
                </summary>
                <p>{ProductToDisplay.description}</p>

                <div className="tags">
                  {ProductToDisplay.tag_list.map((tag, i) => (
                    <p key={i}>#{tag}</p>
                  ))}
                </div>
              </details>
            </section>

            <section className="colors">
              {ProductToDisplay.product_colors
                ? ProductToDisplay.product_colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: `${color.hex_value}`,
                        border: `${color.border}`,
                      }}
                      onClick={() => {
                        dispatch(changeColor(color));
                      }}
                    ></div>
                  ))
                : ""}
            </section>

            <section id="addToCartButton">
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      productDetails: productDetails,
                      selectedColor: selectedColor,
                    })
                  );
                }}
              >
                Add to Cart
              </button>
            </section>
          </div>
        </div>
      )}

      <GoToTop />
    </React.Fragment>
  );
};

export default OnProductClickPage;
