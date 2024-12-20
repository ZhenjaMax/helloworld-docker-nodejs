import React, { useState, useEffect } from 'react';
import axios from 'axios';

const serverAPI = process.env.REACT_APP_SERVER_API_URL;
const serverPort = process.env.REACT_APP_SERVER_API_PORT;
const serverBaseURL = `${serverAPI}:${serverPort}`;

const Counter = () => {
    const [count, setCount] = useState(0);

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
