import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import { AuthContext } from '../context/AuthContext'
import { QuoteType } from '../models/Quote'

export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext)

  const { userId } = useContext(AuthContext)

  const isFavorite = (quoteId: string) => {
    return favorites.some((quote: QuoteType) => quote._id === quoteId)
  }

  const handleFavorite = (quoteId: string) => {
    if (isFavorite(quoteId)) {
      removeFavorite(userId, quoteId)
    } else {
      addFavorite(userId, quoteId)
    }
  }

  return { isFavorite, handleFavorite, favorites }
}
