import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section className="not-found-section">
        <div className="pt-5 mt-5 text-center">
          <h6 className="card-login-title fs-2">Page Not Found</h6>
          <Link to="/" className="text-success">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
