import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "@material-ui/core";
import AccountModal from "./AccountModal";

const AccountMovie = ({ item, deleteMovie }) => {
  const [modal, setModal] = useState(false);
  const openCloseModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Modal open={modal} onClose={openCloseModal}>
        <AccountModal accountItem={item} handleClick={() => openCloseModal()} deleteMovie={()=>deleteMovie()} />
      </Modal>
      <div
        onClick={() => openCloseModal()}
        key={item.id}
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
      >
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
          alt={item?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
          <p
            className="absolute text-gray-300 top-4 right-4"
            onClick={() => {
              deleteMovie(item.id);
            }}
          >
            
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountMovie;
