import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { routes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
    return (
        <div className='container'>
            <AuthProvider>
                <FavoritesProvider>
                    <BrowserRouter>
                        <Routes>
                            {routes.map((route, i) => (
                                <Route key={i} path={route.path} element={route.element} />
                            ))}
                        </Routes>
                    </BrowserRouter>
                </FavoritesProvider>
            </AuthProvider >
        </div>
    );
}

export default App;
