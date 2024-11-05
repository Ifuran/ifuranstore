import React, { useEffect, useState } from "react";
import "./pages.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { checkLoginUser } from "../features/authSlice";
import RatingComponent from "../components/RatingComponent";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { item, isLoading, errorMessage } = useSelector(
    (state) => state.product
  );
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(checkLoginUser());
    if (!token) {
      navigate("/login");
      return;
    }

    const product = { ...item, qty: parseInt(qty) };
    dispatch(addToCart(product));
  };

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
            <h4 className="product-price my-3 text-secondary">
              $ {item.price}
            </h4>
            <RatingComponent rating={item?.rating || 0} />
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select w-auto"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                className="btn btn-success my-3"
                onClick={() => handleAddToCart()}
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </div>
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
