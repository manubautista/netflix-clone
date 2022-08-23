import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { FaTimesCircle } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    backgroundColor: "#191919",
    borderRadius: 8,
    outline: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modal, setModal] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const styles = useStyles();
  const movieModal = (
    <div className={styles.modal}>
      <div className="border-none rounded w-full h-[900px] max-h-[90%] sm:max-h-[40%] md:max-h-[600px]">
        <div onClick={() => openCloseModal()}>
          <FaTimesCircle className="w-7 h-7 m-3 cursor-pointer absolute right-0" />
        </div>
        <div className="absolute w-full h-[300px] xl:h-[500px] top-10 bg-gradient-to-t from-stone-900"></div>
        <img
          className="top-0 w-full h-auto"
          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        />
        <div className="absolute w-full top-[35%] p-5  text-white">
          <h1 className="text-3xl md:text-5xl left-0 font-bold">{item?.title}</h1>
          <div className="mt-20">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <div className="fixed my-1">
            <p className="text-gray-400">
              Released: {item?.release_date}
            </p>
            <p className="mb-5 w-full md:max-w-[90%] md:max-h-[199px] lg:max-w-[900px] lg:max-h-[70px] xl:max-w-[95%] text-gray-200">
              {item?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const openCloseModal = () => {
    setModal(!modal);
  };

  const saveMovie = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <>
      <Modal open={modal} onClose={openCloseModal}>
        {movieModal}
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
          <p onClick={saveMovie}>
            {like ? (
              <FaHeart className="absolute top-4 text-gray300" />
            ) : (
              <FaRegHeart className="absolute top-4 text-gray300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
