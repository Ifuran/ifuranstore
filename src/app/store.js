import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import userReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
