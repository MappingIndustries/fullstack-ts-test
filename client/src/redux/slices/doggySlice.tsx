import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IState } from "../../types";
import * as api from "../api";

const initialState: IState = {
  favorites: [],
  filteredFavorites: [],
  error: "",
  loading: false,
};

export const addToFavorite = createAsyncThunk(
  "/newFavorites",
  async (item: { breed: string; image: string }, { rejectWithValue }) => {
    try {
      const response = await api.addToFavorite(item);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const seeAllFavorites = createAsyncThunk("/favorites", async () => {
  try {
    const response = await api.fetchAllFavorites();
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
});
export const seeFavoritesByBreed = createAsyncThunk(
  "/favorites/breed",
  async (breed: string, { rejectWithValue }) => {
    try {
      const response = await api.fetchFavoritesByBreed(breed);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "/delete/",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      return response.data.favorite;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const resetStateReducer = (state: IState) => {
  state.favorites = [];
  state.error = "";
  state.loading = false;
};
const dogSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    cleanStore: () => {
      return { ...initialState };
    },
  },
  extraReducers: {
    [addToFavorite.pending.toString()]: (state: IState) => {
      state.loading = true;
    },
    [addToFavorite.fulfilled.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = "";
      state.favorites?.push(action.payload);
    },
    [addToFavorite.rejected.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [seeAllFavorites.pending.toString()]: (state: IState) => {
      state.loading = true;
    },
    [seeAllFavorites.fulfilled.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = "";
      state.favorites = action.payload.favorites;
      state.filteredFavorites = [];
    },
    [seeAllFavorites.rejected.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteFavorite.pending.toString()]: (state: IState, action) => {
      state.loading = true;
      state.error = "";
    },
    [deleteFavorite.fulfilled.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = "";
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== action.payload._id
      );
    },
    [seeFavoritesByBreed.pending.toString()]: (state: IState) => {
      state.loading = true;
      state.filteredFavorites = [];
    },
    [seeFavoritesByBreed.fulfilled.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = "";
      state.filteredFavorites = action.payload.favorites;
    },
    [seeFavoritesByBreed.rejected.toString()]: (state: IState, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { cleanStore } = dogSlice.actions;
export default dogSlice.reducer;
