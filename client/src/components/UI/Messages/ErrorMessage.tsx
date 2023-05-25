import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => {
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-warning" role="alert">
            {message}
        </div>
    );
}

export default ErrorMessage;
