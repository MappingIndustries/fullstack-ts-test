import { Request, Response } from "express";
import mongoose from "mongoose";
import Dog from "../models/Dog";

const addToFavorite = async (req: Request, res: Response) => {
  const { image, breed } = req.body;

  try {
    const existingFavorite = await Dog.findOne({ image });

    if (existingFavorite) {
      return res.status(409).json({ message: "Doggy already in the list" });
    }

    const favorite = new Dog({
      _id: new mongoose.Types.ObjectId(),
      image,
      breed,
    });

    const savedFavorite = await favorite.save();

    res.status(201).json({ dog: savedFavorite });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const seeAllFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Dog.find();

    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const favorite = await Dog.findByIdAndDelete(id);

    if (!favorite) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(201).json({ favorite, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  addToFavorite,
  seeAllFavorites,
  deleteFavorite,
};
