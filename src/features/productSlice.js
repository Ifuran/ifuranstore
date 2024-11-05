import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    item: {},
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    fetchProductsSuccess: (state, action) => {
      (state.isLoading = false),
        (state.errorMessage = ""),
        (state.data = action.payload);
    },
    fetchProductByIdSuccess: (state, action) => {
      (state.isLoading = false),
        (state.errorMessage = ""),
        (state.item = action.payload);
    },
    fetchProductLoading: (state, action) => {
      state.isLoading = true;
    },
    fetchProductError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  fetchProductsSuccess,
  fetchProductByIdSuccess,
  fetchProductLoading,
  fetchProductError,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async (dispatch, getState) => {
    dispatch(fetchProductLoading(true));
    try {
      const result = await axios.get("https://fakestoreapi.com/products");
      dispatch(fetchProductsSuccess(result.data));
    } catch (error) {
      dispatch(fetchProductError(error));
    }
  };
}

export function fetchProductById(id) {
  return async (dispatch, getState) => {
    dispatch(fetchProductLoading(true));
    try {
      const result = await axios.get(`https://fakestoreapi.com/products/${id}`);
      dispatch(fetchProductByIdSuccess(result.data));
    } catch (error) {
      dispatch(fetchProductError(error));
    }
  };
}

export function fetchProductsByCategory(category) {
  return async (dispatch, getState) => {
    dispatch(fetchProductLoading(true));
    try {
      const result = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      dispatch(fetchProductsSuccess(result.data));
    } catch (error) {
      dispatch(fetchProductError(error));
    }
  };
}

export function filterProductsByKeyword(keyword) {
  return async (dispatch, getState) => {
    dispatch(fetchProductLoading(true));
    try {
      const result = await axios.get("https://fakestoreapi.com/products");
      if (keyword !== "") {
        const key = keyword.toLowerCase();
        const filteredData = result.data.filter((product) =>
          product.title.toLowerCase().includes(key)
        );
        dispatch(fetchProductsSuccess(filteredData));
      } else {
        dispatch(fetchProductsSuccess(result.data));
      }
    } catch (error) {
      dispatch(fetchProductError(error));
    }
  };
}
