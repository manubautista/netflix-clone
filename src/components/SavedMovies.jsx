import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Modal } from "@material-ui/core";
import MovieModal from "./MovieModal";
import AccountRow from "./AccountRow";

const SavedMovies = () => {

  const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  };
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <Modal open={modal} onClose={openCloseModal}>
        <MovieModal handleClick={() => openCloseModal()} />
      </Modal>
      <h2 className="text-white font-bold md:text-xl p-4">My saved Movies</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          <AccountRow handleClick={() => openCloseModal()} />
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedMovies;
