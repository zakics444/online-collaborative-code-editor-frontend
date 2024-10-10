import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('receiveMessage', (messageData) => {
            setChatLog((prevLog) => [...prevLog, messageData]);  // Append new messages to the chat log
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Emit chat message to the backend
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { message });
            setMessage('');  // Clear the input field after sending
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                {chatLog.map((msg, index) => (
                    <p key={index} style={{ margin: '5px 0' }}>{msg.message}</p>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    style={{ width: '80%', padding: '10px', marginTop: '10px' }}
                />
                <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
