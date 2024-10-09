import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const ListProductComponent = ({ data, category }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
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
          {data.map((product) => (
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
                  <h6 className="card-title text-truncate">{product.title}</h6>
                  <p className="card-price">$ {product.price}</p>
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProductComponent;
