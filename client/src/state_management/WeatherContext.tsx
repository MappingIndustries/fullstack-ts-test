import React, { createContext, useState } from "react";
import { States, Favourites, Search, User } from "../types/types";

export const WeatherContext = createContext<States>({
  favourites: [],
  setFavourites: () => {},
  search: [],
  setSearch: () => {},
  query: "",
  setQuery: () => {},
  city: "",
  setCity: () => {},
  isTheme: false,
  setTheme: () => {},
  token: "",
  setToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  localstorage: "",
  setLocalstorage: () => {},
});

const WeatherProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Favourites[]>([]);
  const [search, setSearch] = useState<Search[]>([]);
  const [query, setQuery] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isTheme, setTheme] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [localstorage, setLocalstorage] = useState<string | null>(
    localStorage.getItem("token")
  );

  return (
    <WeatherContext.Provider
      value={{
        favourites,
        setFavourites,
        search,
        setSearch,
        query,
        setQuery,
        city,
        setCity,
        isTheme,
        setTheme,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        localstorage, 
        setLocalstorage
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
