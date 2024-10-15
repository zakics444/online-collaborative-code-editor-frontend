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

        // Notify when a new user joins
        socket.on('userJoined', (userData) => {
            setChatLog((prevLog) => [
                ...prevLog,
                { message: `${userData.username} has joined the chat!`, systemMessage: true },
            ]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.off('userJoined');
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
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Chat Messages */}
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                {chatLog.map((msg, index) => (
                    <p key={index} style={{ margin: '5px 0', color: msg.systemMessage ? 'gray' : 'black' }}>
                        {msg.message}
                    </p>
                ))}
            </div>

            {/* Chat Input */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    style={{
                        width: '80%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '10px',
                        border: 'none',
                        backgroundColor: '#28a745',
                        color: 'white',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
