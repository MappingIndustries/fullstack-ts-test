import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { QuoteType } from '../../models/Quote';
import { FavoriteItem } from './favoriteItem';

export const FavoritesList: React.FC = () => {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = (quoteId: string) => {
        return favorites.some((quote: QuoteType) => quote._id === quoteId);
    };

    const handleFavorite = (quoteId: string) => {
        if (isFavorite(quoteId)) {
            removeFavorite('4', quoteId);
        } else {
            addFavorite('4', quoteId);
        }
    };


    return (
        <ul>
            {favorites.map((quote: QuoteType) => (
                <FavoriteItem key={quote._id} quote={quote} onFavorite={() => handleFavorite(quote._id)} />
            ))}
        </ul>
    );
};
