import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import Movie from "../Movie/Movie";
import Preloader from "../Preloader/Preloader";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    Axios.get("https://as-cinema-hall.herokuapp.com/movie/getall").then((data) => {
      setMovies(data.data.data);
      setPreloader(false);
    })
    .catch((error) => {
      swal('error', `${error}`, 'error')
    })
  }, []);

  return (
    <div className="container movie-list-container">
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <div className="movie-list-section-header mt-3 sticky-top">
            <h1 className="text-center text-success font-weight-bold">
              Available Movies
            </h1>
          </div>
          <div className="row d-flex justify-content-center">
            {movies.map((movie) => (
              <Movie movie={movie} key={movie._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieLists;
