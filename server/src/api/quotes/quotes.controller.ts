import { Request, Response } from 'express';
import * as QuotesService from './quotes.service';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const getQuoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('id', id);

  try {
    const quote = await QuotesService.getQuoteById(id);
    res.json(quote);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const searchQuotes = async (req: Request, res: Response) => {
  const { query } = req.query;


  try {
    if(!query || query == '') throw new Error('No query provided')
    const quotes = await QuotesService.searchQuotes(query as string);
    res.json(quotes);
  } catch (err: any) {
    res.status(500).send(err?.message);
  }
};
