import React, { useEffect } from "react";
import "./pages.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFromCart, plusOne, minusOne } from "../features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { data, qty, price } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getFromCart());
  }, []);

  const plusOneToCart = (product) => {
    dispatch(plusOne(product));
  };

  const minusOneFromCart = (product) => {
    dispatch(minusOne(product));
  };

  return (
    <>
      <section className="container cart-wrapper pt-5 mt-5">
        <h3 className="cart-title text-success">My Cart</h3>
        {data.length === 0 ? (
          <div className="text-center py-5">
            <p>Cart is empty</p>
            <Link to="/" className="text-success">
              See Products
            </Link>
          </div>
        ) : (
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id}>
                  <td className="w-50">
                    <Link to={`/product/${product.id}`} className="text-dark">
                      {product.title}
                    </Link>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <div className="cart-product-quantity">
                      <button
                        className="btn btn-sm btn-success rounded"
                        onClick={() => plusOneToCart(product)}
                      >
                        +
                      </button>
                      <span className="mx-3">{product.qty}</span>
                      <button
                        className="btn btn-sm btn-success rounded"
                        onClick={() => minusOneFromCart(product)}
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td>{product.price * product.qty}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="fw-bold text-center">
                  Total
                </td>
                <td>${price}</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default CartPage;
