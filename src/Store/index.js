import { configureStore } from "@reduxjs/toolkit";

import CartListSlice from "./Slices/CartListSlice";
import ProductsListSlice from "./Slices/ProductsListSlice";
import clickedBrandSlice from "./Slices/ClickedBrandSlice";
import ClickedProductSlice from "./Slices/ClickedProductSlice";
import selectedProductColorSlice from "./Slices/SelectedProductColorSlice";
import LoginUserSlice from "./Slices/LoginUserSlice";
import LoggedUserDetailsSlice from "./Slices/LoggedUserDetailsSlice";

/**This is the store for all slices */
const store = configureStore({
  reducer: {
    CartList: CartListSlice,

    Productslist: ProductsListSlice,

    clickedBrand: clickedBrandSlice,

    ClickedProduct: ClickedProductSlice,

    selectedProductColor: selectedProductColorSlice,

    LoginUser: LoginUserSlice,

    LoggedUserDetails: LoggedUserDetailsSlice,
    /**Access of all micro reducers. */
  },
});

export default store;
