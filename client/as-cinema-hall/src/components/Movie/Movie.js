import React from "react";

const Movie = ({ movie }) => {
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
          <h3 className="text-center">{movie.movieName}</h3>
          <h5 className="text-center">
            Available Seat: {movie.totalSeat - movie.bookedSeat}
          </h5>
          <h6 className="text-center">
            Show Time: {movie.showDay} <br />
            {movie.showStart} - {movie.showEnd}
          </h6>
          <button className="btn btn-success btn-block mt-2">
            Book Now <span className="badge bg-danger text-white">new</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
