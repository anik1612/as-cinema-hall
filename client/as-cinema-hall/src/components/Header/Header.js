import React from "react";
import { Link } from "react-router-dom";
import brandImg from "../../images/logo/nav-brand.png";
import Typical from "react-typical";
import './Header.css'

const Header = () => {
  return (
    <div class="bg-dark">
      <nav class="navbar navbar-expand-lg navbar-light container bg-dark py-2">
        <Link class="navbar-brand" href="#">
          <img src={brandImg} alt="brand-img" />
        </Link>
        <Link>
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <Link class="nav-link text-white mr-3" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link text-white btn btn-success px-4" to="/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
