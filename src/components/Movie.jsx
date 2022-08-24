import React from "react";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import MovieModal from "./MovieModal";

const Movie = ({ item }) => {

  const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Modal open={modal} onClose={openCloseModal}>
        <MovieModal item={item} handleClick={()=>openCloseModal()}/>
      </Modal>

      <div
        onClick={() => openCloseModal()}
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2"
      >
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
