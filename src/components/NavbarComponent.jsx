import React, { useEffect, useState } from "react";
import "./NavbarComponent.css";
import { NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginUser, logoutUser } from "../features/authSlice";
import { getFromCart } from "../features/cartSlice";

const NavbarComponent = () => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);
  const { qty } = useSelector((state) => state.cart);

  const getCategories = async () => {
    const result = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    setCategories(result.data);
  };

  useEffect(() => {
    dispatch(checkLoginUser());
    dispatch(getFromCart());
    getCategories();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar bg-body-tertiary border-bottom fixed-top"
      >
        <div className="container">
          <Navbar.Brand className="navbar-brand fs-2">
            <Link to="/" className="text-decoration-none text-success">
              Ifuran Store
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="dropdown ms-auto d-block">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((category, index) => (
                  // Menggunakan Link langsung sebagai item dropdown
                  <Link
                    key={index}
                    to={`category/${category}`}
                    className="dropdown-item text-decoration-none text-dark"
                  >
                    {category}
                  </Link>
                ))}
              </NavDropdown>
            </div>
            <form className="form d-flex mx-auto" role="search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search.."
                  aria-label="Search.."
                  aria-describedby="basic-addon2"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </div>
            </form>
            <div className="action-wrapper d-flex gap-3">
              <div className="cart">
                <Link to="/cart" className="btn btn-outline-success">
                  Cart : {qty}
                </Link>
              </div>
              {!token ? (
                <div className="login">
                  <Link to="/login" className="btn btn-success">
                    Login
                  </Link>
                </div>
              ) : (
                <div className="logout">
                  <button className="btn btn-success" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
