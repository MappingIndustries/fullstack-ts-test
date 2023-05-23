import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const searchQuotes = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/quotes/search?query=${query}`)
  return response.data
}

export const addFavoriteQuote = async (userId: string, quoteId: string) => {
  const response = await axios.post(`${BASE_URL}/favorites`, {
    userId,
    quoteId,
  })
  return response.data
}

export const removeFavoriteQuote = async (userId: string, quoteId: string) => {
  const response = await axios.delete(`${BASE_URL}/favorites/${quoteId}`)
  return response.data
}

export const getUserFavorites = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/favorites`, {
    headers: {
      Authorization: userId,
    },
  })
  return response.data
}

export const getQuoteById = async (quoteId: string) => {
  const response = await axios.get(`${BASE_URL}/quotes/${quoteId}`)
  return response.data
}
