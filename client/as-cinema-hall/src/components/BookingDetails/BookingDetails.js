import { faArrowLeft, faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { UserContext } from "../../App";
import Preloader from "../Preloader/Preloader";
import './BookingDetails.css'

const BookingDetails = () => {
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [preloader, setPreloader] = useState(true);
  const name = loggedInUser.name;

  const goBack = () => window.history.back();

  useEffect(() => {
    Axios.get(
      `https://as-cinema-hall.herokuapp.com/movie/ticket/booking?name=${name}`
    )
      .then((data) => {
        setPreloader(false);
        setCart(data.data.data[0].cart);
      })
      .catch((error) => swal("error", `${error}`, "error"));
  }, []);

  return (
    <div className="booking-details-container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <h1 className="text-dark text-center font-weight-bold card-header">
              Your booked seat:
            </h1>
            <div className="card-body py-5">
              {preloader ? (
                <Preloader />
              ) : (
                <div className="booking-details">
                  {cart.map((cartItem) => {
                    return (
                      <h5 className="btn btn-info m-2">
                        {cartItem.i} <FontAwesomeIcon icon={faCouch} />
                      </h5>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="card-footer">
              <button onClick={goBack} className="btn btn-dark px-3 py-2 mx-auto d-block">
                Go Back <FontAwesomeIcon className="ml-2" icon={faArrowLeft} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
