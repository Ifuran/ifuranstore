import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    qty: 0,
    price: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.data.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.qty += action.payload.qty;
      } else {
        state.data.push({
          ...action.payload,
        });
      }

      state.qty += action.payload.qty;
      state.price += action.payload.price * action.payload.qty;

      localStorage.setItem("cart", JSON.stringify(state.data));
      localStorage.setItem("qty", JSON.stringify(state.qty));
      localStorage.setItem("price", JSON.stringify(state.price));
    },
    getFromCart: (state, action) => {
      const existingProduct = localStorage.getItem("cart");
      const qty = localStorage.getItem("qty");
      const price = localStorage.getItem("price");

      if ((state.data = [])) {
        state.data.push(...JSON.parse(existingProduct));
        state.qty = qty;
        state.price = price;
      }
    },
    plusOne: (state, getState) => {
      const product = state.data.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.qty++;
      }
    },
  },
});

export const { addToCart, getFromCart, plusOne } = cartSlice.actions;

export default cartSlice.reducer;
