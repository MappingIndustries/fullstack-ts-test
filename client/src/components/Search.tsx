import React, { useState, useContext } from "react";
import { WeatherContext } from "../state_management/WeatherContext";
import { handleSearch } from "../helperFunctions/helper_functions";
import { FormHandlers } from "../types/types";
import { capitalize } from "../helperFunctions/capitalize";

function Search() {
  const { setSearch, query, setQuery, setCity, isTheme, token } =
    useContext(WeatherContext);
  const [errorCity, setErrorCity] = useState("");
  const formHandlers: FormHandlers = {
    setQuery,
    setSearch,
    setCity,
    setErrorCity,
  };

  return (
    <section className="flex flex-col items-center justify-center mt-6">
      <form className="flex flex-row">
        <input
          className={
            errorCity
              ? "px-2 shadow-inner rounded text-slate-800 border-rose-500 border-solid border-2"
              : "px-2 shadow-inner rounded text-slate-800"
          }
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(() => capitalize(e.target.value))
          }
        />
        <button
          className={
            !isTheme
              ? "shadow-sm px-2 py-2 bg-slate-800 hover:bg-slate-100 hover:text-slate-800 ease-in-out duration-300 rounded"
              : "shadow-sm px-2 py-2 bg-slate-200 hover:bg-slate-800 hover:text-slate-100 ease-in-out duration-300 rounded"
          }
          type="submit"
          onClick={(e) => handleSearch(e, query, formHandlers, token)}
        >
          Search
        </button>
      </form>
      {errorCity ? <p className="text-red-400">{errorCity}</p> : ""}
    </section>
  );
}

export default Search;
