import "./click.css";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";
import { changeColor } from "../../Store/Slices/SelectedProductColorSlice";
import { addToCart } from "../../Store/Slices/CartListSlice";

const OnClickPage = ({}) => {
  const dispatch = useDispatch();

  const productToDisplay = useSelector((state) => {
    return state.ClickedProduct;
  });

  const updatedProduct = { ...productToDisplay };

  const selectedColor = useSelector((state) => {
    return state.selectedProductColor;
  });

  /**Giving border to selected and not selected color */
  if (
    selectedColor !== null &&
    productToDisplay.product_colors &&
    productToDisplay.product_colors.length > 0
  ) {
    updatedProduct.product_colors = updatedProduct.product_colors.map(
      (colors) => ({
        ...colors,
        border: "3px solid white",
      })
    );

    // Setting black border to the selected color
    let clickedColor = updatedProduct.product_colors.find(
      (Procolor) => Procolor.hex_value === selectedColor.hex_value
    );

    if (clickedColor) {
      clickedColor.border = "3px solid black";
    }
  }

  useEffect(() => {
    dispatch(changeColor(updatedProduct.product_colors[0]));
  }, []);

  return (
    <React.Fragment>
      {!productToDisplay ? (
        <h1 style={{ fontFamily: "monospace", textAlign: "center" }}>
          Please wait...1 2 3
        </h1>
      ) : (
        <div className="product-details-onClick">
          <div id="selectedProductImage">
            <img
              src={updatedProduct.api_featured_image}
              alt={updatedProduct.name}
            />
          </div>

          <div id="selectedProductDetails">
            <section>
              <p id="selectedProductName">
                {updatedProduct.name.toUpperCase()}
              </p>
              <p id="productType">Type: {updatedProduct.product_type}</p>
              <p id="selectedProductBrand">Brand: {updatedProduct.brand}</p>
            </section>

            <section id="selectedProductPrice">
              <p>
                <span>{updatedProduct.price_sign}</span>
                <span>{updatedProduct.price}</span>
              </p>
            </section>

            <section id="productDescription">
              <details>
                <summary style={{ cursor: "pointer" }}>
                  Details of product
                </summary>
                <p>{updatedProduct.description}</p>

                <div className="tags">
                  {updatedProduct.tag_list.map((tag, i) => (
                    <p key={i}>#{tag}</p>
                  ))}
                </div>
              </details>
            </section>

            <section className="colors">
              {updatedProduct.product_colors
                ? updatedProduct.product_colors.map((color, i) => (
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
                      productToDisplay: productToDisplay,
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

      <GoToTopOnRouterLink />
    </React.Fragment>
  );
};

export default OnClickPage;
