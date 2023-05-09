import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { deleteFavorite, seeAllFavorites } from "../../redux/slices/doggySlice";
import * as S from "./styled";

export default function Favorites() {
  const dispatch: ThunkDispatch<IState, void, any> = useDispatch();
  const favorites = useSelector((state: IState) => state.favorites);

  useEffect(() => {
    dispatch(seeAllFavorites());
  }, [dispatch]);
  return (
    <S.MainContainer>
      <S.Title> Favorites</S.Title>
      {favorites &&
        favorites.map((favorite: any) => (
          <S.ImageContainer key={favorite._id}>
            <S.Image src={favorite.image} alt={favorite.breed} />
            <S.Button onClick={() => dispatch(deleteFavorite(favorite._id))}>
              Delete
            </S.Button>
          </S.ImageContainer>
        ))}
    </S.MainContainer>
  );
}
