import React, { useState, useEffect } from 'react';
import { QuoteType } from '../../models/Quote';
import { useFavorites } from '../../hooks/useFavorites';
import GenericMessage from '../UI/Messages/GenericMessage';

interface SearchResultsProps {
    quotes: QuoteType[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ quotes }: SearchResultsProps) => {
    const { isFavorite, handleFavorite } = useFavorites();
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        setSearched(false);
    }, [quotes]);

    const handleFavoriteAndSearch = (quoteId: string) => {
        handleFavorite(quoteId);
        setSearched(true);
    };

    return (
        <>
            {quotes.length === 0 && searched ? (
                <GenericMessage message="No results. Maybe try 'Home' or 'Divided'?" />
            ) : (
                quotes.map((quote: QuoteType) => (
                    <div key={quote._id} className="col-md-6 offset-md-3 mt-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{quote.content} - {quote.author}</p>
                                <button
                                    className={`btn btn-${isFavorite(quote._id) ? 'danger' : 'primary'}`}
                                    onClick={() => handleFavoriteAndSearch(quote._id)}
                                >
                                    {isFavorite(quote._id) ? 'Unfavorite' : 'Favorite'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {quotes.length === 0 && !searched && <GenericMessage message="Search for quotes to see results. Maybe try 'Home' or 'Divided'?" />}
        </>
    );
};
