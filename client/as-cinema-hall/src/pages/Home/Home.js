import React from "react";
import Header from "../../components/Header/Header";
import MovieLists from "../../components/MovieLists/MovieLists";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <MovieLists />
    </div>
  );
};

export default Home;
