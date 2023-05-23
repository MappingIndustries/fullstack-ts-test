import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { QuoteType } from '../../models/Quote';

interface FavoriteItemProps {
    quote: QuoteType;
    onFavorite: (quoteId: string) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ quote, onFavorite }) => {
    const { isFavorite } = useContext(FavoritesContext);
    const isQuoteFavorite = isFavorite(quote._id);

    return (
        <li key={quote._id}>
            <p>{quote.content}</p>
            <p>- {quote.author}</p>
            <button onClick={() => onFavorite(quote._id)}>
                {isQuoteFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
        </li>
    );
};
