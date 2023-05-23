import { useState } from 'react'
import { searchQuotes } from '../api/favoritesApi'

export const useSearch = () => {
  const [quotes, setQuotes] = useState([])

  const search = async (searchTerm: string) => {
    const results = await searchQuotes(searchTerm)
    setQuotes(results)
  }

  return { quotes, search }
}
