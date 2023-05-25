import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { Favorites } from '../components/Favorites/Favorites';
import { SearchForm } from '../components/Search/SearchForm';
import { SearchResults } from '../components/Search/SearchResults';

export const SearchQuotes: React.FC = () => {
    const { quotes, search } = useSearch();
    return (
        <div>
            <SearchForm search={search} />
            <SearchResults quotes={quotes} />
            <Favorites />
        </div >
    );
};
