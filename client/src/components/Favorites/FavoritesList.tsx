import React from 'react';
import { QuoteType } from '../../models/Quote';
import { FavoriteItem } from './FavoriteItem';
import { useFavorites } from '../../hooks/useFavorites';

export const FavoritesList: React.FC = () => {
    const { favorites, handleFavorite } = useFavorites();

    return (
        <ul className="list-group">
            {favorites.map((quote: QuoteType) => (
                <FavoriteItem key={quote._id} quote={quote} onFavorite={() => handleFavorite(quote._id)} />
            ))}
        </ul>
    );
};
