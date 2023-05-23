import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'

export const useFavorites = () => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext)

  const isFavorite = (quoteId: string) => {
    return favorites.some((quote) => quote._id === quoteId)
  }

  const handleFavorite = (quoteId: string) => {
    if (isFavorite(quoteId)) {
      removeFavorite('4', quoteId)
    } else {
      addFavorite('4', quoteId)
    }
  }

  return { isFavorite, handleFavorite, favorites }
}
