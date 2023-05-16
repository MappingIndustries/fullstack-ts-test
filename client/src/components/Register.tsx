import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WeatherContext } from "../state_management/WeatherContext";

const showRegisterMessage = () => {
  toast.success("Registered Successfully!", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
const showRegisterMessageFailed = () => {
  toast.error("Registration Failed!", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

const Register = () => {
  const { isTheme } = useContext(WeatherContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword === password) {
      fetch(`${process.env.REACT_APP_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          return data.status === "success"
            ? showRegisterMessage()
            : showRegisterMessageFailed();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
          }, 2000);
        });
    }
    return;
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h3 className={!isTheme ? "text-slate-100 font-bold text-2xl" : "text-slate-800 font-bold text-2xl"}>Register</h3>
      <form
        className={
          !isTheme
            ? "bg-slate-600 p-8 rounded-lg text-white shadow-md flex flex-col"
            : "bg-slate-200 p-8 rounded-lg text-white shadow-md flex flex-col"
        }
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <label className={!isTheme ? "mb-1 text-slate-100" : "mb-1 text-slate-800"} htmlFor="email_input">
          Email
        </label>
        <input
          className="py-1 px-2 mr-1 rounded-full shadow-inner text-slate-800"
          required
          placeholder={"email"}
          id={"email_input"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className={!isTheme ? "mb-1 text-slate-100" : "mb-1 text-slate-800"} htmlFor="password_input">
          Password
        </label>
        <input
          className="py-1 px-2 mr-1 rounded-full shadow-inner text-slate-800"
          required
          type="password"
          placeholder={"password"}
          id={"password_input"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label className="mb-1" htmlFor="confirmed_password_input">
          Confirm password
        </label>
        <input
          className="py-1 px-2 mr-1 rounded-full shadow-inner text-slate-800"
          required
          type="password"
          placeholder={"confirm password"}
          id={"confirmed_password_input"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input
          className={
            !isTheme
              ? "cursor-pointer rounded-full text-slate-100 ease-in-out duration-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-inner px-3 py-1 mt-1"
              : "cursor-pointer rounded-full text-slate-800 ease-in-out duration-300 hover:bg-slate-800 hover:text-slate-100 hover:shadow-inner px-3 py-1 mt-1"
          }
          type={"submit"}
        />
      </form>
      <ToastContainer />
    </section>
  );
};

export default Register;
