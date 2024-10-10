import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';  // Import the correct Editor component
import socket from '../services/socket';  // Ensure the socket is set up properly

const CodeEditor = () => {
    const [code, setCode] = useState('');  // Store the code
    const [language, setLanguage] = useState('javascript');  // Default language for the editor

    // Listen for real-time code updates from other users
    useEffect(() => {
        socket.on('receiveCode', (codeData) => {
            setCode(codeData.code);  // Update the code from other users
        });

        return () => {
            socket.off('receiveCode');
        };
    }, []);

    // Emit real-time code changes to the backend
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        socket.emit('codeChange', { code: newCode });
    };

    return (
        <div style={{ height: "90vh" }}>
            <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                theme="vs-dark"  // VS Code dark theme
                onChange={handleCodeChange}
                options={{
                    fontSize: 14,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
