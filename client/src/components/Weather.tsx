import React, { useState, useContext } from "react";
import { WeatherContext } from "../state_management/WeatherContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { favouriteHandler } from "../helperFunctions/favourite";
import { Search } from "../types/types";
import { toast } from "react-toastify";
import { showWarnMessage, showToastMessage } from "../helperFunctions/toastify";

function Weather() {
  const { search, city, isTheme, token, setSearch } = useContext(WeatherContext);
  const [favourite, setFavourite] = useState(false);

  return (
    <section
      className={
        !isTheme
          ? "flex justify-center bg-slate-600 flex-col self-center mt-5 shadow-md rounded p-4 w-1/2"
          : "flex justify-center bg-slate-200 flex-col self-center mt-5 shadow-md rounded p-4 w-1/2"
      }
    >
      {search.length > 0 ? (
        search.map((data: Search) => (
          <div
            className="flex flex-row justify-between items-center"
            key={data.key}
          >
            <article className="py-3">
              <h1 className="font-bold mb-2 text-lg">{city}</h1>
              <h1>{data.WeatherText}</h1>
              <p>
                Temperature: {data.Temperature.Metric.Value}
                {data.Temperature.Metric.Unit}
              </p>
            </article>
            {favourite ? (
              <AiFillStar
                className="cursor-pointer text-lg"
                onClick={() =>
                  favouriteHandler(
                    data,
                    city,
                    favourite,
                    setFavourite,
                    setSearch,
                    showWarnMessage,
                    toast,
                    showToastMessage,
                    token
                  )
                }
              />
            ) : (
              <AiOutlineStar
                className="cursor-pointer"
                onClick={() =>
                  favouriteHandler(
                    data,
                    city,
                    favourite,
                    setFavourite,
                    setSearch,
                    showWarnMessage,
                    toast,
                    showToastMessage,
                    token
                  )
                }
              />
            )}
          </div>
        ))
      ) : (
        <h3>No Weather to display</h3>
      )}
    </section>
  );
}

export default Weather;
