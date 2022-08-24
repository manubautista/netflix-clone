import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import AccountMovie from "./AccountMovie";

const AccountRow = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

 
  return (
    <>
      {movies.map((item, id) => (
        <AccountMovie
          item={item}
          key={id}
        />
      ))}
    </>
  );
};

export default AccountRow;
