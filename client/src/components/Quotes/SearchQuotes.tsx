import React, { useContext, useState } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { searchQuotes, addFavoriteQuote, removeFavoriteQuote } from '../../api/favoritesApi';
import { QuoteType } from '../../models/Quote';

export const SearchQuotes: React.FC = () => {
    const { favorites, addFavorite } = useContext(FavoritesContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [quotes, setQuotes] = useState([]);

    const search = async (event: React.FormEvent) => {
        event.preventDefault();

        const results = await searchQuotes(searchTerm);
        setQuotes(results);
    };

    const isFavorite = (quoteId: string) => {
        return favorites.some((quote: QuoteType) => quote._id === quoteId);
    };
    const handleFavorite = async (quoteId: string) => {
        if (isFavorite(quoteId)) {
            await removeFavoriteQuote('4', quoteId);
        } else {
            await addFavoriteQuote('4', quoteId);
        }

        const results = await searchQuotes(searchTerm);
        setQuotes(results);
    };

    console.log('quotes', quotes)

    return (
        <div>
            <form onSubmit={search}>
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

