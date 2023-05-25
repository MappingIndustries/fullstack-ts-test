import React from 'react';
import { useSearch } from '../hooks/useSearch';
import { Favorites } from '../components/Favorites/Favorites';
import { SearchForm } from '../components/Search/SearchForm';
import { SearchResults } from '../components/Search/SearchResults';

export const SearchQuotes: React.FC = () => {
    const { quotes, search } = useSearch();
    return (
        <div className='row mt-5'>
            <div className='col-md-6 offset-md-3'>
                <h2>Search for Quotes</h2>
                <SearchForm search={search} />
                <SearchResults quotes={quotes} />
                <Favorites />
            </div>
        </div>
    );
};
