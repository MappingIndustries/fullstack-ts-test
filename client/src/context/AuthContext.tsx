import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

interface AuthContextProps {
    userId: string;
}

export const AuthContext = createContext<AuthContextProps>({
    userId: '',
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const decodedToken: any = jwt_decode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userId }}>
            {children}
        </AuthContext.Provider>
    );
};
