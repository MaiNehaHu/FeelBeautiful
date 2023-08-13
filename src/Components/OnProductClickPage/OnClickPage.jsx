import React, { useEffect, useState } from "react";
import "./click.css";
import GoToTopOnRouterLink from "../GoToTop/GoToTopOnRouterLink";

const Clicked_LS_Key = "ClickedProduct";
function getClickedProduct() {
  let product = sessionStorage.getItem(Clicked_LS_Key);

  if (product) {
    return JSON.parse(sessionStorage.getItem(Clicked_LS_Key));
  } else return;
}

const OnClickPage = ({ clicked, addToCart }) => {
  const [product, setProduct] = useState(clicked);

  useEffect(() => {
    if (product.length === 0) setProduct(getClickedProduct());
  }, []);

  /**Click if product_colors is empty or not */
  let ProductColorObj =
    !product.product_colors || product.product_colors.length === 0
      ? null
      : product.product_colors[0];

  /**Color that is selected */
  const [color, setColor] = useState(ProductColorObj);

  if (
    color !== null &&
    product.product_colors &&
    product.product_colors.length > 0
  ) {
    /**Giving border to selected and not selected color */
    product.product_colors.map((colors) => {
      colors.border = "3px solid white";
    });

    //setting black border to selected color
    let selectedColor = product.product_colors.find(
      (Procolor) => Procolor.colour_name === color.colour_name
    );
    selectedColor.border = "3px solid black";
  }

  /**Change the selected color of product */
  function changeColorSelected(Color) {
    setColor(Color);
  }

  return (
    <React.Fragment>
      {product == "" || product === [] ? (
        <h1 style={{ fontFamily: "monospace", textAlign: "center" }}>
          Please wait...1 2 3
        </h1>
      ) : (
        <div className="product-details-onClick">
          <div id="selectedProductImage">
            <img src={product.api_featured_image} alt={product.name} />
          </div>

          <div id="selectedProductDetails">
            <section>
              <p id="selectedProductName">{product.name.toUpperCase()}</p>
              <p id="productType">Type: {product.product_type}</p>
              <p id="selectedProductBrand">
                Brand: {product.brand.toUpperCase()}
              </p>
            </section>

            <section id="selectedProductPrice">
              <p>
                <span>{product.price_sign}</span>
                <span>{product.price}</span>
              </p>
            </section>

            <section id="productDescription">
              <details>
                <summary style={{ cursor: "pointer" }}>
                  Details of product
                </summary>
                <p>{product.description}</p>

                <div className="tags">
                  {product.tag_list.map((tag, i) => (
                    <p key={i}>#{tag}</p>
                  ))}
                </div>
              </details>
            </section>

            <section className="colors">
              {product.product_colors
                ? product.product_colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: `${color.hex_value}`,
                        border: `${color.border}`,
                      }}
                      onClick={() => changeColorSelected(color)}
                    ></div>
                  ))
                : ""}
            </section>

            <section id="addToCartButton">
              <button onClick={() => addToCart(product, color)}>
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
