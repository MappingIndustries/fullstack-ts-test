import React from "react";
import ReactDOM from "react-dom/client";
import WeatherProvider from "./state_management/WeatherContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WeatherProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WeatherProvider>
);
