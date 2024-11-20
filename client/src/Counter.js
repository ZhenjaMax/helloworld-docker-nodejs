import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverBaseURL = `${process.env.REACT_APP_SERVER_API_URL}:${process.env.REACT_APP_SERVER_API_PORT}`;

const Counter = () => {
    const [count, setCount] = useState(0);

    console.log('API URL:', process.env.REACT_APP_SERVER_API_URL);
    console.log('API Port:', process.env.REACT_APP_SERVER_API_PORT);
    console.log('Server Base URL:', serverBaseURL);

    useEffect(() => {
        const fetchCounter = async () => {
            const response = await axios.get(`${serverBaseURL}/counter`);
            setCount(response.data.value);
        };
        fetchCounter();
    }, []);

    const incrementCounter = async () => {
        const response = await axios.post(`${serverBaseURL}/counter/increment`);
        setCount(response.data.value);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Счётчик: {count}</h1>
            <button style={{padding: '30px'}} onClick={incrementCounter}>+1</button>
        </div>
    );
};

export default Counter;
