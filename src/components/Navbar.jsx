import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          NJ
        </Link>

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Centered search */}
          <div
            className="mx-auto my-2 my-lg-0"
            style={{ width: "350px", maxWidth: "100%" }}
          >
            <SearchBar />
          </div>

          {/* Right buttons */}
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">
            {user ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-light btn-sm rounded-pill px-3"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-light btn-sm rounded-pill px-3"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-outline-light btn-sm rounded-pill px-3"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
