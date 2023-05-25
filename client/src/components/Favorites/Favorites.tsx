import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { FavoritesList } from './FavoritesList';
import GenericMessage from '../UI/Messages/GenericMessage';

export const Favorites: React.FC = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div>
            <h2>Your Favorites</h2>
            {favorites.length > 0 ? (
                <FavoritesList />
            ) : (
                <GenericMessage message='You have no favorites' />
            )}
        </div>
    );
};
