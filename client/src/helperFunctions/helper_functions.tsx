import { FormHandlers } from "../types/types";

export const handleSearch = (
  e: React.FormEvent,
  query: string,
  handlers: FormHandlers,
  token: string | undefined
) => {
  e.preventDefault();
  if (query) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    fetch(`${process.env.REACT_APP_URL}/api/search?q=${query}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Not a valid city") {
          handlers.setErrorCity(data.status);
        } else {
          return (
            handlers.setSearch(data.currentWeather),
            handlers.setCity(data.query)
          );
        }
      })
      .finally(() => {
        handlers.setQuery("");
      })
      .catch((err) => console.log(err));
  }
  handlers.setErrorCity("");
};
