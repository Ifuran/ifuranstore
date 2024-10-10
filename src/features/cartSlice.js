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
      state.price = state.data.reduce((total, product) => {
        return total + product.price * product.qty;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state.data));
      localStorage.setItem("qty", JSON.stringify(state.qty));
      localStorage.setItem("price", JSON.stringify(state.price));
    },
    getFromCart: (state, action) => {
      const existingProduct = localStorage.getItem("cart");
      const qty = localStorage.getItem("qty");
      const price = localStorage.getItem("price");

      if ((state.data = []) && existingProduct) {
        state.data.push(...JSON.parse(existingProduct));
        state.qty = parseInt(qty);
        state.price = parseInt(price);
      }
    },
    plusOne: (state, action) => {
      const product = state.data.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.qty++;
      }

      state.qty++;
      state.price = state.data.reduce((total, product) => {
        return total + product.price * product.qty;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state.data));
      localStorage.setItem("qty", JSON.stringify(state.qty));
      localStorage.setItem("price", JSON.stringify(state.price));
    },
    minusOne: (state, action) => {
      const product = state.data.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        product.qty--;

        if (product.qty <= 0) {
          state.data = state.data.filter((item) => item.id !== product.id);
        }
      }

      state.qty = state.data.reduce((total, product) => total + product.qty, 0);
      state.price = state.data.reduce((total, product) => {
        return total + product.price * product.qty;
      }, 0);

      localStorage.setItem("cart", JSON.stringify(state.data));
      localStorage.setItem("qty", JSON.stringify(state.qty));
      localStorage.setItem("price", JSON.stringify(state.price));
    },
  },
});

export const { addToCart, getFromCart, plusOne, minusOne } = cartSlice.actions;

export default cartSlice.reducer;
