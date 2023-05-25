import React, { useState } from 'react';
import { Register } from '../components/Auth/Register';

const Home: React.FC = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className='row mt-5'>
            <div className='col-md-6 offset-md-3'>
                <h1 className='text-center'>Welcome to The Quotes</h1>
                {showLogin && <Register />}
            </div>
        </div>
    );
};

export default Home;
