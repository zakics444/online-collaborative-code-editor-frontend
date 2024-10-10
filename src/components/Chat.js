import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('receiveMessage', (messageData) => {
            setChatLog((prevLog) => [...prevLog, messageData]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Emit chat message to the backend
    const sendMessage = () => {
        socket.emit('sendMessage', { message });
        setMessage('');
    };

    return (
        <div>
            <div>
                {chatLog.map((msg, index) => (
                    <p key={index}>{msg.message}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;