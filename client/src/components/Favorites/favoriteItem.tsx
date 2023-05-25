import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { QuoteType } from '../../models/Quote';

type FavoriteItemProps = {
    quote: QuoteType;
    onFavorite: (quoteId: string) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({ quote, onFavorite }: FavoriteItemProps) => {
    const { isFavorite } = useContext(FavoritesContext);
    const isQuoteFavorite = isFavorite(quote._id);

    return (
        <li className="list-group-item">
            <p>{quote.content}</p>
            <p>- {quote.author}</p>
            <button className="btn btn-primary" onClick={() => onFavorite(quote._id)}>
                {isQuoteFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
        </li>
    );
};
