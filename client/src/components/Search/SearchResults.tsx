import React from 'react';
import { QuoteType } from '../../models/Quote';
import { useFavorites } from '../../hooks/useFavorites';
import GenericMessage from '../UI/Messages/GenericMessage';

interface SearchResultsProps {
    quotes: QuoteType[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ quotes }) => {
    const { isFavorite, handleFavorite } = useFavorites();

    return (
        <>
            {quotes.length === 0 ? (
                <GenericMessage message="No results. Maybe try 'Home' or 'Divided'?" />
            ) : (
                quotes && quotes.map((quote: QuoteType) => (
                    <div key={quote._id}>
                        <p>{quote.content} - {quote.author}</p>
                        <button onClick={() => handleFavorite(quote._id)}>
                            {isFavorite(quote._id) ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </div>
                ))
            )}
        </>
    );
};
