import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  deleteFavorite,
  seeAllFavorites,
  seeFavoritesByBreed,
} from "../../redux/slices/doggySlice";
import { breeds } from "../../assets/Breeds";
import * as S from "./styled";

export default function Favorites() {
  const dispatch: ThunkDispatch<IState, void, any> = useDispatch();
  const favorites = useSelector((state: IState) => state.favorites);
  const favoritesFiltered = useSelector(
    (state: IState) => state.filteredFavorites
  );
  const error = useSelector((state: IState) => state.error);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  useEffect(() => {
    dispatch(seeAllFavorites());
  }, [dispatch]);

  const handleSearch = () => {
    if (!breeds.includes(searchQuery)) {
      setSearchError(
        "This breed is not registered in our database. Check the list of breeds on Home Page"
      );
    } else {
      dispatch(seeFavoritesByBreed(searchQuery));
      setSearchError("");
    }
  };
  const renderFiltered = favoritesFiltered?.map((favorite: any) => (
    <S.ImageContainer key={favorite._id}>
      <S.Image src={favorite.image} alt={favorite.breed} />
    </S.ImageContainer>
  ));
  const renderAll = favorites?.map((favorite: any) => (
    <S.ImageContainer key={favorite._id}>
      <S.Image src={favorite.image} alt={favorite.breed} />
      <S.Button onClick={() => dispatch(deleteFavorite(favorite._id))}>
        Delete
      </S.Button>
    </S.ImageContainer>
  ));

  return (
    <S.MainContainer>
      <S.Title> Favorites</S.Title>
      {error && <S.Error>{error}</S.Error>}
      {searchError && (
        <div>
          <S.Error>{searchError}</S.Error>
        </div>
      )}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {favoritesFiltered.length > 0 ? renderFiltered : renderAll}
    </S.MainContainer>
  );
}
