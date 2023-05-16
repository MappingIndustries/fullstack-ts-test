import React, { useState, useContext } from "react";
import { authUser } from "../authentication/authUser";
import { WeatherContext } from "../state_management/WeatherContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const { setToken, isLoggedIn, setIsLoggedIn, setUser, isTheme } =
    useContext(WeatherContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (checkbox) {
          setToken(data.accessToken);
          localStorage.setItem("token", data.accessToken);
          authUser(data.accessToken, setUser, navigate);
          setIsLoggedIn(!isLoggedIn);
        } else {
          setToken(data.accessToken);
          authUser(data.accessToken, setUser, navigate);
          setIsLoggedIn(!isLoggedIn);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoginEmail("");
        setLoginPassword("");
        setCheckbox(false);
      });
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <h3 className={!isTheme ? "text-slate-100 font-bold text-2xl" : "text-slate-800 font-bold text-2xl"}>Login</h3>
        <form
          onSubmit={(e: React.FormEvent) => handleLogin(e)}
          className={
            !isTheme
              ? "bg-slate-600 p-8 rounded-lg text-white shadow-md flex flex-col"
              : "bg-slate-200 p-8 rounded-lg text-white shadow-md flex flex-col"
          }
        >
          <label className={!isTheme ? "mb-1 text-slate-100" : "mb-1 text-slate-800"} htmlFor="email_input">
            Email
          </label>
          <input
            className="py-1 px-2 mr-1 rounded-full shadow-inner text-slate-800"
            placeholder={"Email"}
            id={"email_input"}
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <br />
          <label className={!isTheme ? "mb-1 text-slate-100" : "mb-1 text-slate-800"} htmlFor="password_input">
            Password
          </label>
          <input
            className="py-1 px-2 mr-1 rounded-full shadow-inner text-slate-800"
            type="password"
            placeholder={"Password"}
            id={"password_input"}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br />
          <div className="flex flex-row justify-center mb-1">
            <input
              className="mr-2"
              onChange={() => setCheckbox(!checkbox)}
              type="checkbox"
            />
            <span className={!isTheme ? "text-slate-100" : "text-slate-800"}>Remember me</span>
          </div>
          <input
            className={
              !isTheme
                ? "cursor-pointer rounded-full text-slate-100 ease-in-out duration-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-inner px-3 py-1 mt-1"
                : "cursor-pointer rounded-full text-slate-800 ease-in-out duration-300 hover:bg-slate-800 hover:text-slate-100 hover:shadow-inner px-3 py-1 mt-1"
            }
            type={"submit"}
          />
        </form>
      </section>
    </>
  );
};

export default LoginForm;
