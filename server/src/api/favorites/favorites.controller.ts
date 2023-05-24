import { Request, Response } from 'express';
import * as FavoritesService from './favorites.service';

export const addFavorite = async (req: Request, res: Response) => {
  const userId = req.userId;
  console.log('userId', userId);
  const { quoteId } = req.body;

  try {
    await FavoritesService.addFavorite(userId, quoteId);
    res.status(201).send();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await FavoritesService.deleteFavorite(userId, id);
    res.status(200).send();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const favs = await FavoritesService.getFavorites(userId);

    res.status(200).json(favs);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
