import "./OnProductClickPage.scss";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import GoToTop from "../../hooks/GoToTop/GoToTop";
import { changeColor } from "../../Store/Slices/SelectedProductColorSlice";
import { addToCart } from "../../Store/Slices/CartListSlice";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const OnProductClickPage = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.ClickedProduct;
  });
  const selectedColor = useSelector((state) => {
    return state.selectedProductColor;
  });
  const ProductToDisplay = { ...productDetails };
  const className = "clickedProduct";

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
        <div className={className}>
          <header>
            <Link to="/AllProducts">
              <IoChevronBackCircleSharp className="backBtn" />
            </Link>

            <p className={className + "__name"}>
              {ProductToDisplay.name.toUpperCase()}
            </p>
          </header>

          <div className={className + "__container"}>
            <div className={className + "__image"}>
              <img
                src={ProductToDisplay.api_featured_image}
                alt={ProductToDisplay.name}
              />
            </div>

            <div className={className + "__details"}>
              <section>
                <p className={className + "__type"}>
                  Type: {ProductToDisplay.product_type}
                </p>
                <p className={className + "__brand"}>
                  Brand: {ProductToDisplay.brand}
                </p>
              </section>

              <section className={className + "__price"}>
                <p>
                  <span>{ProductToDisplay.price_sign} </span>
                  <span>{ProductToDisplay.price}</span>
                </p>
              </section>

              <section className={className + "__description"}>
                <details>
                  <summary style={{ cursor: "pointer" }}>
                    Details of product
                  </summary>
                  <p>{ProductToDisplay.description}</p>

                  <div className={className + "__tags"}>
                    {ProductToDisplay.tag_list.map((tag, i) => (
                      <p key={i}>#{tag}</p>
                    ))}
                  </div>
                </details>
              </section>

              <section className={className + "__colors"}>
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
        </div>
      )}

      <GoToTop />
    </React.Fragment>
  );
};

export default OnProductClickPage;
