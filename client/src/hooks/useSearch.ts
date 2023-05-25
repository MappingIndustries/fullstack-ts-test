import { useState } from 'react'
import { searchQuotes } from '../api/favoritesApi'

export const useSearch = () => {
  const [quotes, setQuotes] = useState([])

  const search = async (searchTerm: string) => {
    try {
      const results = await searchQuotes(searchTerm)
      setQuotes(results)
    } catch (error) {
      console.error('Error searching quotes:', error)
    }
  }

  return { quotes, search }
}
