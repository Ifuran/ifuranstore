import React, { useEffect } from "react";
import "./pages.css";
import PaginationComponent from "../components/PaginationComponent";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ListProductComponent from "../components/ListProductComponent";
import { useParams } from "react-router-dom";

const ListProductPage = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const { data, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (name) {
      dispatch(fetchProductsByCategory(name));
    } else {
      dispatch(fetchProducts());
    }
  }, [name]);

  if (isLoading) {
    return (
      <div className="container product-list pt-5 mt-5 text-center">
        Loading....
      </div>
    );
  }

  if (errorMessage) {
    console.log(errorMessage);
    return (
      <div className="container product-list pt-5 mt-5 text-center">
        {errorMessage}
      </div>
    );
  }

  return (
    <>
      <section className="container product-list pt-5 mt-5">
        <ListProductComponent data={data} category={name} />
        <PaginationComponent />
      </section>
    </>
  );
};

export default ListProductPage;
