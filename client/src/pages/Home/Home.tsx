import React, { useState } from "react";
import * as S from "./styled";
import { breeds } from "../../assets/Breeds";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../redux/slices/doggySlice";
import { IState } from "../../types";
import { ThunkDispatch } from "@reduxjs/toolkit";

export default function Home() {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [image, setImage] = useState<string>();
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const stateError = useSelector((state: IState) => state.error);
  const dispatch: ThunkDispatch<IState, void, any> = useDispatch();

  const handleBreedChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedBreed(event.target.value);
    setError("");
  };
  const handleSelectRandom = () => {
    if (selectedBreed === "") {
      setError("Select a breed first!");
    } else fetchDogImage();
  };
  const handleSelectAll = () => {
    if (selectedBreed === "") {
      setError("Select a breed first!");
    } else fetchAllImages();
  };

  const fetchDogImage = async () => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random`
      );
      setImage(response.data.message);
    } catch (err: any) {
      return err.message;
    }
  };
  const fetchAllImages = async () => {
    try {
      const response = await axios.get(
        `https://dog.ceo/api/breed/${selectedBreed}/images`
      );
      setImagesList(response.data.message);
    } catch (err: any) {
      return err.message;
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="breed">Select a breed:</label>
        <select id="breed" value={selectedBreed} onChange={handleBreedChange}>
          <option value="">-- Select Breed --</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        {selectedBreed && <p>You selected: {selectedBreed}</p>}
      </div>
      <div>
        <button onClick={handleSelectRandom}>Select random</button>
        or
        <button onClick={handleSelectAll}>Select all of the breed</button>
      </div>
      {image && (
        <S.ImageContainer>
          <S.RandomImage src={image} alt="doggy" />
          <S.Button
            onClick={() =>
              dispatch(addToFavorite({ image: image, breed: selectedBreed }))
            }
          >
            Add to Favorite
          </S.Button>
        </S.ImageContainer>
      )}

      {error && <S.Error>{error}</S.Error>}
      {stateError && <S.Error>{stateError}</S.Error>}
      {imagesList && (
        <div>
          {imagesList.map((image, index) => (
            <S.ImageContainer>
              <S.ListImage key={index} src={image} alt="doggy" />
              <S.Button
                onClick={() =>
                  dispatch(
                    addToFavorite({ image: image, breed: selectedBreed })
                  )
                }
              >
                Add to Favorite
              </S.Button>
            </S.ImageContainer>
          ))}
        </div>
      )}
    </div>
  );
}
