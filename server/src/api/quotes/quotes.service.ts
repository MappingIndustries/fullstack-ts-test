import api from '../../utils/axios';
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
