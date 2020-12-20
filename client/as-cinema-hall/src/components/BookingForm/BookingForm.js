import React, { useContext, useEffect, useState } from "react";
import { SelectedMovieContext, UserContext } from "../../App";
import "./BookingForm.css";
import Axios from "axios";
import Seat from "../Seat/Seat";
import { faCouch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

const BookingForm = () => {
  const [selectedMovie, setSelectedMovie] = useContext(SelectedMovieContext);
  const [counts, setCounts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    const movieName = selectedMovie.movieName;
    Axios.get(`https://as-cinema-hall.herokuapp.com/movie?name=${movieName}`).then((data) => {
      setCounts(data.data.data[0].seatReservation);
    });
  }, []);

  // handle ticket selection
  const handleTicketBooking = (seat) => {
    const isExisting = cart.find((item) => item === seat);
    if (cart.length < 10) {
      if (isExisting) {
        swal("Sorry", "you have already choose this seat");
      } else {
        const newCart = [...cart, seat];
        setCart(newCart);
      }
    } else {
      swal("Sorry", `You can't buy more than 10 ticket at a time`);
    }
  };

  // remove selected ticket if want
  const handleRemoveItem = (item) => {
    const remainItem = cart.filter((cartItem) => cartItem !== item);
    setCart(remainItem);
  };

  // ticket confirm button
  const handleConfirmBtn = () => {
    const name = loggedInUser.name;
    Axios.post("https://as-cinema-hall.herokuapp.com/movie/ticket/booking", {
      name,
      selectedMovie,
      cart,
    })
      .then((data) => {
        if (data.data) {
          updateBookedSeat();
          swal(
            "success",
            "your booking has been placed successfully",
            "success"
          );
        }
      })
      .catch((error) => {
        swal("error", `${error}`, "error");
      });
  };

  const updateBookedSeat = () => {
    // update booked seat counts
    const id = selectedMovie._id;
    Axios.patch(`https://as-cinema-hall.herokuapp.com/movie/update/${id}`, {
      bookedSeat: cart.length,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        swal("error", `${error}`, "error");
      });
  };

  return (
    <div className="booking-container">
      <div className="pt-3 row">
        <div className="col-md-2 card p-0 mr-3 card-shadow ml-5">
          <img
            className="img-fluid card-img-top"
            src={selectedMovie.moviePoster}
            height="350px"
            alt="movie-poster"
          />
          <div className="card-body">
            <h4 className="text-center">{selectedMovie.movieName}</h4>
            <h5 className="text-center">
              Price: {selectedMovie.ticketPrice} $
            </h5>
            <h5 className="text-center">{selectedMovie.showDate}</h5>
            <h5 className="text-center">
              {selectedMovie.showStart} - {selectedMovie.showEnd}
            </h5>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="booking-instruction d-flex justify-content-between">
                <p className="bg-danger text-white font-weight-bold p-1 border rounded">
                  Red Means - Booked
                </p>
                <p className="bg-success text-white font-weight-bold p-1 border rounded">
                  Green Means - Available
                </p>
              </div>
              <div className="seat-container">
                {counts.map((count) => (
                  <Seat
                    seat={count}
                    key={count._id}
                    handleTicketBooking={handleTicketBooking}
                  />
                ))}
                <div className="confirm-seat">
                  <button
                    onClick={handleConfirmBtn}
                    className="btn btn-dark btn mt-3 font-weight-bold mx-auto d-block p-3"
                  >
                    Confirm Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {cart.length > 0 && (
            <div className="card">
              <div className="card-body d-flex flex-column">
                <div>
                  <h4 className="p-2 text-center font-weight-bold text-white border rounded bg-success mb-5">
                    Selected Seat
                  </h4>
                </div>
                <div className="d-flex justify-content-between row">
                  {cart.map((item) => {
                    return (
                      <h5 className="text-center bg-danger p-2 border rounded text-white">
                        <p className="mb-3 p-1 bg-dark border rounded">
                          {item.i}
                        </p>
                        <FontAwesomeIcon icon={faCouch} />
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="btn btn-dark ml-5"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </h5>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
