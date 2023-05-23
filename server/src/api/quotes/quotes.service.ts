import api from '../../utils/axios';
import pool from '../../config/db';
import redisClient from '../../config/cache';

export const getQuoteById = async (id: string) => {
  let quote = await redisClient.get(id);

  if (quote) {
    quote = JSON.parse(quote);
  } else {
    const response = await api.get(`/quotes/${id}`);
    quote = response.data;
    await redisClient.set(id, JSON.stringify(quote));
  }

  return quote;
};

export const searchQuotes = async (query: string) => {
  const response = await api.get(`search/quotes/?query=${query}`);
  return response.data.results;
};

export const addFavorite = async (userId: string, quoteId: string) => {
  try {
    const checkQuery =
      'SELECT * FROM user_favorites WHERE user_id = $1 AND quote_id = $2';
    const checkValues = [userId, quoteId];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rowCount === 0) {
      const insertQuery =
        'INSERT INTO user_favorites (user_id, quote_id) VALUES ($1, $2)';
      const insertValues = [userId, quoteId];
      await pool.query(insertQuery, insertValues);
    } else {
      throw new Error('Favorite already exists for this user.');
    }
  } catch (error: any) {
    throw new Error(`Could not add favorite: ${error.message}`);
  }
};

export const deleteFavorite = async (userId: string, quoteId: string) => {
  try {
    await pool.query(
      'DELETE FROM user_favorites WHERE user_id = $1 AND quote_id = $2',
      [userId, quoteId]
    );
  } catch (error) {
    console.error(
      `Could not delete favorite quote ${quoteId} for user ${userId}:`,
      error
    );
    throw error;
  }
};

export const getFavorites = async (userId: string) => {
  const { rows } = await pool.query(
    'SELECT quote_id FROM user_favorites WHERE user_id = $1',
    [userId]
  );

  const quoteDetails = [];

  for (let { quote_id } of rows) {
    let quote = await redisClient.get(quote_id);

    if (quote) {
      quote = JSON.parse(quote);
    } else {
      const response = await api.get(`/quotes/${quote_id}`);
      quote = response.data;

      await redisClient.set(quote_id, JSON.stringify(quote));
    }

    quoteDetails.push(quote);
  }
  return quoteDetails;
};
