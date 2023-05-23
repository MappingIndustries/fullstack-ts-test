import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { QuoteType } from '../../models/Quote';

interface FavoriteItemProps {
    quote: QuoteType;
    onFavorite: (quoteId: string) => void;
    onRemoveFavorite: (quoteId: string) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ quote, onFavorite, onRemoveFavorite }) => {
    const { isFavorite } = useContext(FavoritesContext);
    const isQuoteFavorite = isFavorite(quote._id);

    return (
        <li key={quote._id}>
            <p>{quote.content}</p>
            <p>- {quote.author}</p>
            {
                isQuoteFavorite ?
                    <button onClick={() => onRemoveFavorite(quote._id)}>Unfavorite</button> :
                    <button onClick={() => onFavorite(quote._id)}>Favorite</button>
            }
        </li>
    );
};
