import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { QuoteType } from '../../models/Quote';
import { FavoriteItem } from './favoriteItem';
import { useFavorites } from '../../hooks/useFavorites';

export const FavoritesList: React.FC = () => {
    const { favorites, handleFavorite } = useFavorites();

    return (
        <ul>
            {favorites.map((quote: QuoteType) => (
                <FavoriteItem key={quote._id} quote={quote} onFavorite={() => handleFavorite(quote._id)} />
            ))}
        </ul>
    );
};
