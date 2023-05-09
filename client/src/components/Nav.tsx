import React from "react";
import * as S from "./styled";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../types";
export default function Layout() {
  const favoritesNumber = useSelector(
    (state: IState) => state.favorites?.length
  );
  return (
    <>
      <S.NavContainer>
        <S.List>
          <li>
            <Link to="/favorites">Your favorites({favoritesNumber})</Link>
          </li>
        </S.List>
      </S.NavContainer>
      <Outlet />
    </>
  );
}
