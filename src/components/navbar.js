import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MyContext from "../context/notes/noteContext";

function Navbar() {
  // using context
  const { authToken } = useContext(MyContext);

  // using useLocation hook
  let location = useLocation();
  const navigate = useNavigate();
  // using useeffect hook which will call itself at the end of the compile not necessary
  // React.useEffect(() => {
  //   // Google Analytics
  //   console.log(location.pathname);
  // }, [location]);

  const deactivateAuthToken = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item`}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/home"
                      ? "active bg-secondary text-alert"
                      : ""
                  }aria-current="true"`}
                  aria-current="page"
                  to="home"
                >
                  Home
                </Link>
              </li>
              <li className={`nav-item`}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/about"
                      ? "active bg-secondary text-light"
                      : ""
                  }aria-current="true"`}
                  to="about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Login and Sign Up Buttons */}
          <form className="d-flex">
            {authToken === null ? (
              <>
                <Link
                  className="btn btn-primary me-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                className="btn btn-primary me-2 "
                to="/login"
                role="button"
                onClick={deactivateAuthToken}
              >
                Log Out
              </Link>
            )}
            <Link
              className="btn btn-primary me-2"
              to="/signup"
              role="button"
            >
              Sign up
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
  
            }
export default Navbar;