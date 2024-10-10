import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';  // Correct component import
import socket from '../services/socket';

const CodeEditor = () => {
    const [code, setCode] = useState('');

    // Handle code changes and emit them through WebSocket
    const handleCodeChange = (value) => {
        setCode(value);
        socket.emit('codeChange', { code: value });
    };

    useEffect(() => {
        // Listen for real-time code updates from other users
        socket.on('receiveCode', (codeData) => {
            setCode(codeData.code);
        });

        // Clean up the listener on component unmount
        return () => {
            socket.off('receiveCode');
        };
    }, []);

    return (
        <div style={{ height: '90vh' }}>
            {/* Monaco Editor for a VS Code-like experience */}
            <Editor
                height="90vh"
                language="javascript"  // You can set this dynamically based on user preference
                theme="vs-dark"  // You can also use 'vs-light' or 'hc-black'
                value={code}
                onChange={(ev, value) => handleCodeChange(value)}  // Correct onChange for Monaco Editor
                options={{
                    automaticLayout: true,
                    minimap: { enabled: true },  // Enable/disable minimap (like in VS Code)
                    wordWrap: "on",  // Word wrap the code
                }}
            />
        </div>
    );
};

export default CodeEditor;
