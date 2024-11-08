import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { checkLoginUser } from "../features/authSlice";
import RatingComponent from "./RatingComponent";

const ListProductComponent = ({ data, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);

  const handleAddToCart = (product) => {
    dispatch(checkLoginUser());
    if (!token) {
      navigate("/login");
      return;
    }

    const item = { ...product, qty: 1 };
    dispatch(addToCart(item));
  };

  return (
    <>
      <div className="product-list-wrapper">
        <h3 className="product-list-title text-success">
          {category
            ? `Category ${
                category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()
              }`
            : "Products"}
        </h3>
        <div className="row">
          {data.length === 0 ? (
            <div className="text-center py-5">No data found</div>
          ) : (
            data.map((product) => (
              <div className="col-lg-3 col-6 mb-3" key={product.id}>
                <div className="card">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={product.image}
                      className="product-image card-img-top object-fit-contain"
                      alt={product.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title text-truncate">
                      {product.title}
                    </h6>
                    <p className="card-price">$ {product.price}</p>
                    <RatingComponent rating={product.rating} />
                    <button
                      className="btn btn-sm btn-outline-success mt-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ListProductComponent;
