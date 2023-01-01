import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-start">
          <Link
            className={`nav-link mx-2 navbar-brand ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`nav-link mx-2 navbar-brand ${
              location.pathname === "/about" ? "active" : ""
            }`}
            to="/about"
          >
            About
          </Link>
        </div>
        {!localStorage.getItem("authToken") ? (
          <form className="d-flex">
            <Link
              className="btn btn-sm btn-primary mx-2"
              to="/login"
              role="button"
            >
              login
            </Link>
            <Link
              className="btn btn-sm btn-primary mx-2"
              to="/signup"
              role="button"
            >
              signup
            </Link>
          </form>
        ) : (
          <button className="btn btn-primary mx-2" onClick={handleLogout}>
            Logout
          </button>
        )}
        {/* <form>
          <Link className="btn btn-primary mx-2" to="/login" role="button">
            login
          </Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">
            signup
          </Link>
        </form> */}
      </nav>
    </div>
  );
}

export default Navbar;
