import React, { useEffect } from "react";
import "./pages.css";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { item, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

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
      <section className="container product-wrapper pt-5 mt-5">
        <div className="row">
          <div className="col-lg-6 col-12 mt-3">
            <img
              src={item.image}
              alt=""
              className="product-detail-image object-fit-contain img-fluid"
            />
          </div>
          <div className="col-lg-6 col-12 mt-3">
            <h3 className="product-title">{item.title}</h3>
            <h4 className="product-price mt-3 text-secondary">
              $ {item.price}
            </h4>
            <button className="btn btn-success my-3">Add to Cart</button>
            <h6 className="my-3 fw-bold">
              Category:{" "}
              <span className="badge text-bg-success">{item.category}</span>
            </h6>
            <h6 className="fw-bold">Description:</h6>
            <p>{item.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
