import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginUser, loginUser } from "../features/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { username, password };
    dispatch(loginUser(credentials));
  };

  const { token, isLoading, errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLoginUser());
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <section className="login-section">
        <div className="col-lg-5 col-10 pt-5 mt-5 mx-auto">
          <div className="card">
            <div className="card-body">
              <h6 className="card-login-title fs-2">
                Welcome to{" "}
                <span className="brand text-success">Ifuran Store!</span>
              </h6>
              <p>Please login your account</p>
              {errorMessage ? (
                <p className="text-danger">{errorMessage}</p>
              ) : (
                <p></p>
              )}
              <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  {isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-success w-100 mb-3"
                      disabled
                    >
                      Logging in...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success w-100 mb-3"
                    >
                      Login
                    </button>
                  )}
                  <Link to="/" className="text-success">
                    Back to home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
