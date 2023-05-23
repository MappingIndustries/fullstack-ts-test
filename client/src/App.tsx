import React from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchQuotes } from './components/Quotes/SearchQuotes';
import { Favorites } from './components/Favorites/Favorites';

const App: React.FC = () => {
    return (
        <FavoritesProvider>
            <div className="App">
                <h1>My Favorite Quotes</h1>
                <SearchQuotes />
                <Favorites />
            </div>
        </FavoritesProvider>
    );
};

export default App;
