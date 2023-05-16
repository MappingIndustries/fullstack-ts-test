import "./App.css";
import { Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { WeatherContext } from "./state_management/WeatherContext";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import { authToken } from "./authentication/authToken";

function App() {
  const { isTheme,token,localstorage, setToken, setUser, setIsLoggedIn, isLoggedIn } = useContext(WeatherContext);

  useEffect(() => {
    if (!token && localstorage) {
      setToken(localstorage);
    } else if (token) {
      authToken(token, setUser, setIsLoggedIn, isLoggedIn);
    }
  }, [token, localstorage, setToken, isLoggedIn, setIsLoggedIn, setUser]);

  return (
    <div
      className={
        !isTheme
          ? "flex flex-col text-gray-100 bg-gray-700 ease-in-out h-screen"
          : "flex flex-col bg-gray-100 text-gray-900 ease-in-out h-screen"
      }
    >
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
