import axios from 'axios'
import { ensureAuthenticatedRequest } from './api'

const BASE_URL = 'http://localhost:5000/api'

export const searchQuotes = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/quotes/search?query=${query}`)
  return response.data
}

export const addFavoriteQuote = async (userId: string, quoteId: string) => {
  const response = await ensureAuthenticatedRequest('/favorites', {
    method: 'POST',
    data: {
      quoteId,
      userId,
    },
  })
  return response.data
}

export const removeFavoriteQuote = async (userId: string, quoteId: string) => {
  const response = await ensureAuthenticatedRequest(`/favorites/${quoteId}`, {
    method: 'DELETE',
    data: {
      userId,
    },
  })
  return response.data
}

export const getUserFavorites = async () => {
  try {
    const response = await ensureAuthenticatedRequest('/favorites')
    return response.data
  } catch (error) {
    console.error('Failed to fetch user favorites:', error)
    throw error
  }
}

export const getQuoteById = async (qouteId: string): Promise<any> => {
  const response = await ensureAuthenticatedRequest(`/quotes/${qouteId}`)
  return response.data
}
