import React from 'react';

interface GenericMessageProps {
    message: string;
}

const GenericMessage: React.FC<GenericMessageProps> = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div className="">
            {message}
        </div>
    );
}

export default GenericMessage;
