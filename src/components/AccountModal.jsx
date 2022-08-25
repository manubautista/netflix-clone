import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from 'sweetalert2'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { onSnapshot } from "firebase/firestore";

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

const AccountModal = ({ accountItem, handleClick }) => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const styles = useStyles();
  const navigate = useNavigate();
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "#ff5252",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteMovie = (passedID) => {
    Swal.fire()
    Swal.fire({
      title: "Delete Movie",
      text: "You want to delete this movie from your list?",
      color: '#ffffff',
      icon: "question",
      target: "#modal",
      background:  'rgba(0,0,0)',
      customClass: { container: "alert-absolute" },
      showCancelButton: true,
      confirmButtonColor: "#ff1616",
      cancelButtonColor: "#232323",
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const result = movies.filter((item) => item.id !== passedID);
          await updateDoc(movieRef, {
            savedShows: result,
          })
          Toast.fire({
            icon: "success",
            title: "Movie removed!",
          });
        } catch (error) {
          console.log(error);
        }
      }
    })
    
  };


  return (
    <div id="modal" className={styles.modal}>
      <div
        id="movie-modal"
        className="border-none rounded w-[300px] h-[450px] max-h-[90%] sm:h-[500px] md:max-h-[500px] sm:w-[600px] xl:w-[800px]"
      >
        <div onClick={() => handleClick()} className='text-gray-600'>
          <AiFillCloseCircle className="w-7 h-7 m-3 cursor-pointer absolute right-0" />
        </div>
        <div className="absolute w-full h-[130px] xl:h-[244px] md:h-[130px] sm:top-[210px] top-10 bg-gradient-to-t 2xl:top-[43%] from-stone-900"></div>
        <img
          className="top-0 w-full h-auto"
          src={`https://image.tmdb.org/t/p/original/${accountItem?.img}`}
        />
        <div className="absolute w-full top-[15%] p-5 sm:top-[160px] 2xl:top-[220px] xl:top-[220px] text-white">
          <h1 className="text-3xl md:text-3xl left-0 font-bold sm:text-3xl">
            {accountItem?.title}
          </h1>
          <div className="top-[120px] absolute sm:top-[90px]">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p
            className="text-3xl top-[165%] left-[84%] absolute cursor-pointer xl:left-[250px] xl:top-[126%] 2xl:top-[127%] lg:top-[126%] lg:left-[45%] md:top-[127%] md:left-[43%] sm:top-[130%] sm:left-[43%]"
            onClick={() => deleteMovie(accountItem.id)}
          >
            <AiOutlineCloseCircle />
          </p>

          <div className="fixed my-1 top-[240px] xl:top-[372px] lg:top-[322px] md:top-[60%] sm:top-[320px]">
            <p className="text-gray-400">
              Released: {accountItem?.release_date}
            </p>
            <p className="mb-5 w-full md:max-w-[90%] md:max-h-[199px] lg:max-w-[900px] lg:max-h-[30px] xl:max-w-[95%] text-gray-200">
              {truncateString(accountItem?.overview, 267)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
