import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

const Editor = () => {
    const [code, setCode] = useState('');

    // Listen for real-time code updates from other users
    useEffect(() => {
        socket.on('receiveCode', (codeData) => {
            setCode(codeData.code);
        });

        return () => {
            socket.off('receiveCode');
        };
    }, []);

    // Emit real-time code changes to the backend
    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        socket.emit('codeChange', { code: newCode });
    };

    return (
        <textarea
            value={code}
            onChange={handleCodeChange}
            rows="20"
            cols="50"
        ></textarea>
    );
};

export default Editor;