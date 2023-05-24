import React, { useState } from 'react';
import Login from '../components/Auth/Login';

const Home: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <h1>Welcome to our website!</h1>
            <button onClick={() => setShowLogin(true)}>Login</button>
            {showLogin && <Login />}
        </div>
    );
};

export default Home;
