import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Movie from "../Movie/Movie";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5000/movie/getall").then((data) => {
      setMovies(data.data.data);
    });
  }, []);

  console.log(movies);

  return (
    <div className="container movie-list-container">
      <div className="movie-list-section-header mt-3">
        <h1 className="text-center text-success font-weight-bold">
          Available Movies
        </h1>
      </div>
      <div className="row d-flex justify-content-center">
        {movies.map((movie) => (
          <Movie movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  );
};

export default MovieLists;
