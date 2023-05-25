import React, { useState } from 'react';

type SearchFormProps = {
    search: (searchTerm: string) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({ search }: SearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            search(searchTerm);
        }
    };

    return (
        <div className="row mt-5 mb-5">
            <div className="col-md-6 offset-md-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search quotes..."
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
