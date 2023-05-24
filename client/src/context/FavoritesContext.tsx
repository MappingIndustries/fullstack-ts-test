import React, { createContext, useState, useEffect } from 'react';
import { QuoteType } from '../models/Quote';
import { addFavoriteQuote, getUserFavorites, getQuoteById, removeFavoriteQuote } from '../api/favoritesApi';
import { getUserIdFromToken } from '../utils/authUtils';


interface FavoritesContextProps {
    favorites: QuoteType[];
    setFavorites: React.Dispatch<React.SetStateAction<QuoteType[]>>;
    addFavorite: (userId: string, quoteId: string) => Promise<void>;
    removeFavorite: (userId: string, quoteId: string) => Promise<void>;
    isFavorite: (quoteId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
    favorites: [],
    setFavorites: () => { },
    addFavorite: () => Promise.resolve(),
    removeFavorite: () => Promise.resolve(),
    isFavorite: () => false,
});

export const FavoritesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [favorites, setFavorites] = useState<QuoteType[]>([]);

    const addFavorite = async (userId: string, quoteId: string,) => {
        try {
            await addFavoriteQuote(userId, quoteId);
            const quote = await getQuoteById(quoteId);
            setFavorites((prevFavorites) => [...prevFavorites, quote]);
        } catch (error) {
            console.error('Could not add favorite:', error);
        }
    };

    const removeFavorite = async (userId: string, quoteId: string) => {
        try {
            await removeFavoriteQuote(userId, quoteId);
            setFavorites((prevFavorites) =>
                prevFavorites.filter((quote) => quote._id !== quoteId)
            );
        } catch (error) {
            console.error('Could not remove favorite:', error);
        }
    };

    const isFavorite = (quoteId: string) => {
        return favorites.some(favorite => favorite._id === quoteId);
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favorites = await getUserFavorites();
                setFavorites(favorites);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const getUserId = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return null;
        }
        return getUserIdFromToken(token);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
