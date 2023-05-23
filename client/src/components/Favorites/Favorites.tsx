import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { FavoritesList } from './FavoritesList';

export const Favorites: React.FC = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div>
            <h2>Your Favorites</h2>
            {favorites.length > 0 ? (
                <FavoritesList />
            ) : (
                <p>You have no favorite quotes yet.</p>
            )}
        </div>
    );
};
