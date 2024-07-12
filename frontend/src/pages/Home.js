import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/')
            .then(response => setMessage(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div>{message}</div>
            )}
        </div>
    );
};

export default Home;
