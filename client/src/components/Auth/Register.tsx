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

export const Register: React.FC = () => {
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
            setErrorMessage('Valid Password is required. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
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
        <div className='col-md-6 offset-md-3 mt-5'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button className="btn btn-primary" type="submit">Register</button>
                {errorMessage && <ErrorMessage message={errorMessage} />}
            </form>
        </div>
    );
};
