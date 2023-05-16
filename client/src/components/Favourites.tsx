import React, { useEffect, useContext, useState } from "react";
import { WeatherContext } from "../state_management/WeatherContext";
import { AiFillStar } from "react-icons/ai";
import { removeFav } from "../helperFunctions/removeFavourite";
import { toast } from "react-toastify";
import {
  showDeleteMessage,
  showErrorMessage,
} from "../helperFunctions/toastify";

function Favourites() {
  const { favourites, setFavourites, isTheme, token, localstorage } =
    useContext(WeatherContext);
  const [deleteFav, setDeleteFav] = useState(false);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    fetch(`${process.env.REACT_APP_URL}/api/favorites`, requestOptions)
      .then((response) => response.json())
      .then((data) => setFavourites(data))
      .catch((err) => console.log(err));
  }, [setFavourites, deleteFav, token, localstorage]);

  return (
    <section
      className={
        !isTheme
          ? "flex justify-center flex-col self-center mt-5 w-1/2"
          : "flex justify-center flex-col self-center mt-5 w-1/2"
      }
    >
      {favourites.length > 0 ? (
        favourites.map((fav) => (
          <article
            className={
              !isTheme
                ? "flex flex-row justify-between items-center bg-slate-600 p-4 mt-2 shadow-md rounded"
                : "flex flex-row justify-between bg-slate-200 items-center p-4 mt-2 shadow-md rounded"
            }
            key={fav.key}
          >
            <div className="py-3">
              <h1 className="font-bold mb-2 text-lg">{fav.city}</h1>
              <p>{fav.IsDayTime ? "Day Time" : "Night Time"}</p>
              <h2>{fav.WeatherText}</h2>
              <p>
                Temperature: {fav.Temperature.Metric.Value}{" "}
                {fav.Temperature.Metric.Unit}
              </p>
            </div>
            <AiFillStar
              className="cursor-pointer text-lg"
              onClick={() =>
                removeFav(
                  fav.key,
                  setDeleteFav,
                  deleteFav,
                  showDeleteMessage,
                  toast,
                  showErrorMessage,
                  token
                )
              }
            />
          </article>
        ))
      ) : (
        <h1 className="p-5">No Favourites</h1>
      )}
    </section>
  );
}

export default Favourites;
