import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SelectedMovieContext, UserContext } from "../../App";

const Movie = ({ movie }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedMovie, setSelectedMovie] = useContext(SelectedMovieContext);
  let history = useHistory();
  const handleBookings = (movie) => {
    if (loggedInUser.isSignedIn) {
      history.push("/bookings");
    } else {
      history.push("/login");
    }
    setSelectedMovie(movie);
  };

  return (
    <div className="col-md-4">
      <div className="card m-3">
        <img
          src={movie.moviePoster}
          className="card-img-top"
          height="350px"
          alt="movie-poster"
        />
        <div className="card-body">
          <h3 className="text-center font-weight-bold">{movie.movieName}</h3>
          <h5 className="text-center font-weight-bold">Ticket Price: {movie.ticketPrice} $</h5>
          <h5 className="text-center">
            Available Seat: {movie.totalSeat - movie.bookedSeat}
          </h5>
          <h6 className="text-center">
            {movie.showDay} {movie.showDate}
            <br />
            {movie.showStart} - {movie.showEnd}
          </h6>
          <button
            onClick={() => handleBookings(movie)}
            className="btn btn-success btn-block mt-2"
          >
            Book Now <span className="badge bg-danger text-white">new</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
