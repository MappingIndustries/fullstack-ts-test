import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authApi';
import ErrorMessage from '../UI/Messages/ErrorMessage';

interface ValidationError {
    target: any;
    value: string;
    property: string;
    children: any[];
    constraints: Record<string, string>;
}

interface ApiError {
    message?: {
        error: string;
    };
    errors?: ValidationError[];
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleErrorMessage = (error: ApiError) => {
        if (error.errors) {
            const errorMessages = error.errors.flatMap((err: ValidationError) => Object.values(err.constraints));
            setErrorMessage(errorMessages.join(', '));
        } else if (error.message) {
            setErrorMessage("Please provide a valid password");
        } else {
            setErrorMessage('An unknown error occurred');
        }
    };

    const validateForm = () => {
        if (!username && !password) {
            setErrorMessage('Username and password are required');
            return false;
        }

        if (username.trim() === '') {
            setErrorMessage('Username is required');
            return false;
        }

        if (password.trim() === '') {
            setErrorMessage('Password is required');
            return false;
        }

        return true;
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await register(username, password);
            clearForm();
            navigate('/quotes');
        } catch (error: unknown) {
            const apiError = error as ApiError;
            handleErrorMessage(apiError);
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
                <ErrorMessage message={errorMessage} />
            </form>
        </div>
    );
};

export default Register;
