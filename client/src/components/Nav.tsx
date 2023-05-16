import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { WeatherContext } from "../state_management/WeatherContext";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";
import { motion } from "framer-motion";
import { spring } from "../helperFunctions/animations";

function Nav() {
  const {
    isTheme,
    setTheme,
    isLoggedIn,
    setToken,
    setLocalstorage,
    setUser,
    setIsLoggedIn,
    setFavourites,
    setSearch
  } = useContext(WeatherContext);
  const navigate = useNavigate();
  
  const logout = () => {
    setLocalstorage("");
    localStorage.clear();
    setToken("");
    setUser(null);
    setSearch([]);
    setIsLoggedIn(!isLoggedIn);
    setFavourites([]);
    navigate("/");
  };

  return (
    <nav
      className={
        !isTheme
          ? "bg-gray-800 flex flex-row justify-around items-center p-8 border-b-gray800 shadow-md shadow-md-gray-900 w-screen"
          : "bg-gray-300 flex flex-row justify-around p-8 border-b items-center shadow-md w-screen"
      }
    >
      <Link to={"/"}>
        <h2
          className={
            !isTheme
              ? "px-4 py-1 hover:shadow-inner hover:bg-slate-100 hover:text-slate-800 rounded ease-in-out duration-300"
              : "px-4 py-1 hover:shadow-inner hover:bg-slate-800 hover:text-slate-100 rounded ease-in-out duration-300"
          }
        >
          Search
        </h2>
      </Link>
      <Link to={"/favourites"}>
        <h2
          className={
            !isTheme
              ? "px-4 py-1 hover:shadow-inner hover:bg-slate-100 hover:text-slate-800 rounded ease-in-out duration-300"
              : "px-4 py-1 hover:shadow-inner hover:bg-slate-800 hover:text-slate-100 rounded ease-in-out duration-300"
          }
        >
          Favourites
        </h2>
      </Link>
      {isLoggedIn ? (
        <button
          className={
            !isTheme
              ? "px-4 py-1 hover:shadow-inner hover:bg-slate-100 hover:text-slate-800 rounded ease-in-out duration-300"
              : "px-4 py-1 hover:shadow-inner hover:bg-slate-800 hover:text-slate-100 rounded ease-in-out duration-300"
          }
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to={"/login"}>
            <h2
              className={
                !isTheme
                  ? "px-4 py-1 hover:shadow-inner hover:bg-slate-100 hover:text-slate-800 rounded ease-in-out duration-300"
                  : "px-4 py-1 hover:shadow-inner hover:bg-slate-800 hover:text-slate-100 rounded ease-in-out duration-300"
              }
            >
              Login
            </h2>
          </Link>
          <Link to={"/register"}>
            <h2
              className={
                !isTheme
                  ? "px-4 py-1 hover:shadow-inner hover:bg-slate-100 hover:text-slate-800 rounded ease-in-out duration-300"
                  : "px-4 py-1 hover:shadow-inner hover:bg-slate-800 hover:text-slate-100 rounded ease-in-out duration-300"
              }
            >
              Register
            </h2>
          </Link>
        </>
      )}

      <div
        className={
          !isTheme
            ? "cursor-pointer w-10 h-[25px] bg-gray-100 flex justify-start rounded-[50px] p-[2.5px] self-end"
            : "cursor-pointer w-10 h-[25px] bg-gray-800 flex justify-end rounded-[50px] p-[2.5px] self-end"
        }
        onClick={() => setTheme(!isTheme)}
      >
        <motion.div
          className={
            !isTheme
              ? "w-5 h-5 bg-gray-800 rounded-[40px] flex items-center justify-center"
              : "w-5 h-5 bg-gray-100 rounded-[40px] flex items-center justify-center"
          }
          layout
          transition={spring}
        >
          {isTheme ? (
            <IoIosSunny className="h-3" />
          ) : (
            <IoIosMoon className="h-3" />
          )}
        </motion.div>
      </div>
    </nav>
  );
}

export default Nav;
