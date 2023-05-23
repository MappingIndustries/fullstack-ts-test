import React, { useContext, useState } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { addFavoriteQuote, removeFavoriteQuote } from '../../api/favoritesApi';
import { QuoteType } from '../../models/Quote';
import { useSearch } from '../../hooks/useSearch';

export const SearchQuotes: React.FC = () => {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { quotes, search } = useSearch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        search(searchTerm);
    };

    const isFavorite = (quoteId: string) => {
        return favorites.some((quote: QuoteType) => quote._id === quoteId);
    };

    const handleFavorite = async (quoteId: string) => {
        if (isFavorite(quoteId)) {
            await removeFavoriteQuote('4', quoteId);
            removeFavorite('4', quoteId);
        } else {
            await addFavoriteQuote('4', quoteId);
            addFavorite('4', quoteId);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search quotes..."
                />
                <button type="submit">Search</button>
            </form>

            {quotes && quotes.map((quote: QuoteType) => (
                <div key={quote._id}>
                    <p>{quote.content} - {quote.author}</p>
                    <button onClick={() => handleFavorite(quote._id)}>
                        {isFavorite(quote._id) ? 'Unfavorite' : 'Favorite'}
                    </button>
                </div>
            ))}
        </div>
    );
};
