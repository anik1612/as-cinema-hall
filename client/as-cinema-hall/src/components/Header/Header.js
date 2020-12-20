import React, { useContext } from "react";
import { Link } from "react-router-dom";
import brandImg from "../../images/logo/nav-brand.png";
import Typical from "react-typical";
import "./Header.css";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div class="bg-dark header sticky-top">
      <nav class="navbar navbar-expand-lg sticky-top navbar-light container bg-dark py-2">
        <Link to="/" class="navbar-brand" href="#">
          <img src={brandImg} alt="brand-img" />
        </Link>
        <Link to="/" className="text-decoration-none">
          <Typical
            className="text-success font-weight-bolder font-md"
            steps={["Welcome", 1000, "AS CINEMA HALL...", 1500]}
            loop={Infinity}
            wrapper="p"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto d-flex align-items-center">
            <li class="nav-item active">
              <Link class="nav-link text-white mr-3" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item active">
              {loggedInUser.isSignedIn ? (
                <div class="dropdown">
                  <button
                    class="nav-link text-white btn btn-success px-3 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={loggedInUser.image}
                      height="30px"
                      className="mr-2"
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                    {loggedInUser.name}
                  </button>
                  <div
                    class="dropdown-menu bg-dark"
                    aria-labelledby="dropdownMenuButton text-dark"
                  >
                    <button
                      onClick={() => setLoggedInUser({})}
                      class="dropdown-item text-white"
                    >
                      Logout
                    </button>
                    <Link class="dropdown-item text-white">Dashboard</Link>
                    <Link class="dropdown-item text-white">Movie List</Link>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  class="nav-link text-white btn btn-success px-4"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
