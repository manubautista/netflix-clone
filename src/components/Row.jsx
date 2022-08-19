import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const slider = useRef()

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft -= 500;
  }

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft += 500;
  }
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
        onClick={slideLeft} 
        className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
        size={40}/>

        <div id={'slider' + rowID} className="w-full left-0 h-full overflow-x-scroll whitespace-nowrap scrollbar-hide relative">
          {movies.map((item, id) => (
            <Movie item={item} key={id}/>
          ))}
        
        </div>
        <MdChevronRight
        onClick={slideRight} 
        className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
        size={40}/>
      </div>
    </>
  );
};

export default Row;
