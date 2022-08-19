import axios from "axios";
import React, { useState, useEffect } from "react";
import Movie from "./Movie";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="text-white">
        {movies.map((item, id) => (
          <Movie item={item}></Movie>
        ))}
      </div>
    </>
  );
};

export default Row;
