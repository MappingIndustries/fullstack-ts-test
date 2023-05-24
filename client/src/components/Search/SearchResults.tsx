import React from 'react';
import { QuoteType } from '../../models/Quote';
import { useFavorites } from '../../hooks/useFavorites';
import { NoResultsMessage } from '../../components/UI/Messages/NoResultsMessage';

interface SearchResultsProps {
    quotes: QuoteType[];
}

export const SearchResults: React.FC = ({ quotes }: SearchResultsProps) => {
    const { isFavorite, handleFavorite } = useFavorites();

    return (
        <>
            {quotes.length === 0 ? (
                <NoResultsMessage />
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
