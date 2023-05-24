import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await register(username, password);
            navigate('/quotes');
        } catch (error) {
            console.error(`Login failed: ${error}`);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
