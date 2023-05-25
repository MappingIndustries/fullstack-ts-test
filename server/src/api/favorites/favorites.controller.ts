import { Request, Response } from 'express';
import * as FavoritesService from './favorites.service';
import { ExtendedRequest } from '../../types/express';


export const addFavorite = async (req: Request, res: Response) => {
  const user = (req as ExtendedRequest).user;
  const { quoteId } = req.body;

  try {
    if (user) {
      await FavoritesService.addFavorite(user.userId, quoteId);
      res.status(201).send();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const user = (req as ExtendedRequest).user;
  const quoteId = req.params.id

  try {
    if(user) {
    await FavoritesService.deleteFavorite(user.userId, quoteId);
    res.status(200).send();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  const user = (req as ExtendedRequest).user;

  try {
   if(user) { 
    const favorites = await FavoritesService.getFavorites(user.userId);
    res.status(200).json(favorites);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ error: 'Failed to get favorites' });
  }
};

