import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000" });

export const addToFavorite = (item: { breed: string; image: string }) =>
  API.post("newFavorite", item);
export const fetchAllFavorites = () => API.get("/favorites");
export const deleteUser = (id: string) => API.delete(`/delete/${id}`);
