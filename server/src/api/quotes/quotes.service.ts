import api from '../../utils/axios';
import pool from '../../config/db';
import redisClient from '../../config/cache';

export const searchQuotes = async (query: string) => {
  const response = await api.get(`search/quotes/?query=${query}`);
  return response.data.results;
};

export const addFavorite = async (userId: string, quoteId: string) => {
  try {
    const query =
      'INSERT INTO user_favorites (user_id, quote_id) VALUES ($1, $2)';
    const values = [userId, quoteId];

    await pool.query(query, values);
  } catch (error) {
    throw new Error(`Could not add favorite: ${error}`);
  }
};

export const getFavorites = async (userId: string) => {
  const { rows } = await pool.query(
    'SELECT quote_id FROM user_favorites WHERE user_id = $1',
    [userId]
  );

  console.log('rows', rows);
  const quoteDetails = [];

  for (let { quote_id } of rows) {
    let quote = await redisClient.get(quote_id);

    if (quote) {
      quote = JSON.parse(quote);
    } else {
      const response = await api.get(`/quotes/${quote_id}`);
      quote = response.data;
      console.log('quote', quote);

      await redisClient.set(quote_id, JSON.stringify(quote));
    }

    quoteDetails.push(quote);
  }
  return quoteDetails;
};
