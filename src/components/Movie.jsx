import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { FaTimesCircle } from "react-icons/fa";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

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
  const navigate = useNavigate()

  const openCloseModal = () => {
    setModal(!modal);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  })

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
      Toast.fire({
        icon: 'success',
        title: 'Added to your account!',
        target:'#modal',
      })
    } else {
      Swal.fire({
        title: 'Not logged in!',
        text: "Please log in to your account to save a movie",
        icon: 'warning',
        target:'#modal',
        customClass:{container: 'alert-absolute'},
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Later',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  };
  const movieModal = (
    <div id="modal" className={styles.modal}>
      <div id="movie-modal" className="border-none rounded w-[300px] h-[450px] max-h-[90%] sm:h-[500px] md:max-h-[500px] sm:w-[600px] xl:w-[800px]">
        <div onClick={() => openCloseModal()}>
          <FaTimesCircle className="w-7 h-7 m-3 cursor-pointer absolute right-0" />
        </div>
        <div className="absolute w-full h-[130px] xl:h-[244px] md:h-[130px] sm:top-[210px] top-10 bg-gradient-to-t 2xl:top-[43%] from-stone-900"></div>
        <img
          className="top-0 w-full h-auto"
          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        />
        <div className="absolute w-full top-[15%] p-5 sm:top-[160px] 2xl:top-[220px] xl:top-[220px] text-white">
          <h1 className="text-3xl md:text-3xl left-0 font-bold sm:text-3xl">{item?.title}</h1>
          <div className="top-[120px] absolute sm:top-[90px]">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
            <p
            className="text-3xl top-[97%] left-[84%] absolute cursor-pointer xl:left-[250px] xl:top-[106%] 2xl:top-[107%] lg:top-[106%] lg:left-[48%] md:top-[109%] md:left-[45%]" 
            onClick={saveMovie}>
              {like ? (
                <FaHeart className="absolute top-4 text-gray300" />
              ) : (
                <FaRegHeart className="absolute top-4 text-gray300" />
              )}
            </p>
          
          <div className="fixed my-1 top-[240px] xl:top-[372px] lg:top-[322px] md:top-[60%] sm:top-[320px]">
            <p className="text-gray-400">
              Released: {item?.release_date}
            </p>
            <p className="mb-5 w-full md:max-w-[90%] md:max-h-[199px] lg:max-w-[900px] lg:max-h-[30px] xl:max-w-[95%] text-gray-200">
              {truncateString(item?.overview, 267)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <Modal open={modal} onClose={openCloseModal}>
        {movieModal}
      </Modal>
      <div onClick={() => openCloseModal()}  
        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2"
      >
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item.title}
        />
        <div
        className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
