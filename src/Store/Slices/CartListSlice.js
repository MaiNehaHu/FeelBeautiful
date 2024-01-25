import { createSlice } from "@reduxjs/toolkit";

/**Take cart list from Local Storage */
const Cart_LS_Key = "CartList";
function getCartList() {
  let list = localStorage.getItem(Cart_LS_Key);

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function uniqueKey() {
  return Math.ceil(Math.random() * Math.pow(10, 10));
}

const CartListSlice = createSlice({
  name: "Cart List",
  initialState: getCartList(),
  reducers: {
    addToCart(state, action) {
      let { productDetails, selectedColor } = action.payload;

      selectedColor = !selectedColor
        ? {
            hex_value: "#ffffff00",
            colour_name: "White",
            border: "3px solid white",
          }
        : selectedColor;

      let sameOne = state.find(
        (item) =>
          item.name === productDetails.name &&
          item.color.hex_value === selectedColor.hex_value
      );

      if (sameOne == undefined) {
        const newItem = {
          key: uniqueKey(),
          count: 1,
          color: selectedColor,
          ...productDetails,
        };
        const updatedList = [newItem, ...state];

        localStorage.setItem("CartList", JSON.stringify(updatedList));
        return updatedList;
      } else {
        sameOne.count += 1;

        localStorage.setItem("CartList", JSON.stringify(state));
      }
    },

    deleteFromCart(state, action) {
      const updatedList = state.filter(
        (item) => item.key !== action.payload.key
      );

      localStorage.setItem(Cart_LS_Key, JSON.stringify(updatedList));

      return [...updatedList];
    },

    incrementCount(state, action) {
      const product = state.find((item) => item.key === action.payload.key);

      product.count += 1;
      //incrementing

      localStorage.setItem("CartList", JSON.stringify(state));
      return state;
    },

    decrementCount(state, action) {
      const product = state.find((item) => item.key === action.payload.key);

      product.count = product.count <= 1 ? 1 : product.count - 1;
      //decrementing on a condition. if count is less than 1 or equal to 1. Then don't decrese

      localStorage.setItem("CartList", JSON.stringify(state));
      return state;
    },
  },
});

export default CartListSlice.reducer;
export const { addToCart, deleteFromCart, incrementCount, decrementCount } =
  CartListSlice.actions;
export const cartList = CartListSlice.getInitialState();
