import React, { useState } from 'react';

type SearchFormProps = {
    search: (searchTerm: string) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({ search }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            search(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search quotes..."
            />
            <button type="submit">Search</button>
        </form>
    );
};
