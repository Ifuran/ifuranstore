import React from "react";
import { Link } from "react-router-dom";

const PaginationComponent = () => {
  return (
    <>
      <nav aria-label="Page navigation example" className="py-3">
        <ul className="pagination justify-content-between">
          <li className="page-item">
            <Link
              className="page-link text-light bg-success py-3 px-5"
              href="#"
            >
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link
              className="page-link text-light bg-success py-3 px-5"
              href="#"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
