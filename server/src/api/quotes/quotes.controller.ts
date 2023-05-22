import { Request, Response } from 'express';
import * as QuotesService from './quotes.service';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const searchQuotes = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const quotes = await QuotesService.searchQuotes(query as string);
    res.json(quotes);
  } catch (err: any) {
    res.status(500).send(err?.message);
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { quoteId } = req.body;

  try {
    await QuotesService.addFavorite(userId, quoteId);
    res.status(201).send();
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const favs = await QuotesService.getFavorites(userId);

    res.status(200).json(favs);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
