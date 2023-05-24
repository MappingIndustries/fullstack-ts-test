import React, { useState } from 'react';
import Register from '../components/Auth/Register';

const Home: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div>
            <h1>Welcome to our website!</h1>
            <button onClick={() => setShowLogin(true)}>Register</button>
            {showLogin && <Register />}
        </div>
    );
};

export default Home;
