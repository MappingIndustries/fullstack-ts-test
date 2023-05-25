import React from 'react';
import { ReactElement } from 'react';
import Home from './pages/Home';
import { SearchQuotes } from './pages/SearchQuotes';

interface RouteObject {
    path: string;
    element: ReactElement;
}

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/quotes',
        element: <SearchQuotes />,
    }
];
