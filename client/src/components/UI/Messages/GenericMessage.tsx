import React from 'react';

interface GenericMessageProps {
    message: string;
}

const GenericMessage: React.FC<GenericMessageProps> = ({ message }: GenericMessageProps) => {
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-info" role="alert">
            {message}
        </div >
    );
}

export default GenericMessage;
