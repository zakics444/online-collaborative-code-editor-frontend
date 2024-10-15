import React, { useState, useEffect, useRef } from 'react'; // useRef to store initial code state
import { Editor } from '@monaco-editor/react';
import socket from '../services/socket';
import axios from '../services/axios';
import Chat from './Chat';
import { useLocation } from 'react-router-dom'; // Import useLocation to get data passed from Project.js
import './Editor.css'; // Import the CSS file for styling

const CodeEditor = () => {
    const location = useLocation();
    const projectName = location.state?.projectName || ''; // Fallback to empty string if undefined
    const pjpassword = location.state?.pjpassword || ''; // Fallback to empty string if undefined

    const [code, setCode] = useState(''); // Current code being edited
    const [language, setLanguage] = useState('javascript');
    const [isSaved, setIsSaved] = useState(false);
    
    const initialCodeRef = useRef(''); // Ref to store the initial code when user joins the project
    const editedSinceJoin = useRef(false); // Track whether the user has edited the code since joining

    // Fetch project code on component mount
    useEffect(() => {
        console.log('Project Name:', projectName);
        console.log('Project Password:', pjpassword);

        // Ensure project name and password exist
        if (!projectName || !pjpassword) {
            alert('Project name or password is missing.');
            return;
        }

        const fetchProjectCode = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                
                const response = await axios.get(`/projects/${projectName}/${pjpassword}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in Authorization header
                    }
                });

                if (response.data.code !== undefined) {
                    if (response.data.code === '') {
                        const defaultCode = '// No code found for this project.\n';
                        setCode(defaultCode);
                        initialCodeRef.current = defaultCode; // Save initial code
                    } else {
                        setCode(response.data.code); // Set the project code if available
                        initialCodeRef.current = response.data.code; // Save initial code
                    }
                } else {
                    console.error('No code found for the project.');
                    const defaultCode = '// No code found for this project.\n';
                    setCode(defaultCode); // Provide fallback text
                    initialCodeRef.current = defaultCode; // Save initial code
                }
            } catch (error) {
                console.error('Failed to fetch project code:', error.message);
            }
        };

        fetchProjectCode();
    }, [projectName, pjpassword]);

    // Real-time code updates from other users
    useEffect(() => {
        socket.on('receiveCode', (codeData) => {
            setCode(codeData.code);
        });

        return () => {
            socket.off('receiveCode');
        };
    }, []);

    // Handle code change in editor
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        editedSinceJoin.current = true; // Mark that the user has edited the code since joining
        socket.emit('codeChange', { code: newCode, projectName, pjpassword });
    };

    // Save code to the backend
    const saveCode = async () => {
        if (!projectName || !pjpassword) {
            alert('Project name or password is missing.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            await axios.post(
                `/projects/saveCode`,
                { projectName, pjpassword, code },
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Add token in the Authorization header
                    }
                }
            );
            setIsSaved(true);
            editedSinceJoin.current = false; // Reset edited status since the code is now saved
            alert('Code saved successfully');
        } catch (error) {
            console.error('Error saving code:', error.message);
            alert('Failed to save code');
        }
    };

    // Unsave code (clear unsaved changes and revert to the initial code)
    const unsaveCode = async () => {
        if (!projectName || !pjpassword) {
            alert('Project name or password is missing.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            if (editedSinceJoin.current) {
                // If the user has edited, clear unsaved changes and revert to the initial code
                setCode(initialCodeRef.current);
                editedSinceJoin.current = false; // Reset the edited flag
                alert('Unsaved changes cleared. Reverted to the initial code.');
            } else {
                alert('No unsaved changes to clear.');
            }

            setIsSaved(false);
        } catch (error) {
            console.error('Error reverting code:', error.message);
            alert('Failed to revert code');
        }
    };

    return (
        <div className="editor-container">
            <div className="editor-and-chat">
                {/* Code Editor Section */}
                <div className="editor-section">
                    <Editor
                        height="80vh"
                        defaultLanguage={language}
                        value={code}
                        theme="vs-dark"
                        onChange={handleCodeChange}
                        options={{
                            fontSize: 14,
                            automaticLayout: true,
                        }}
                    />
                    <div className="editor-buttons">
                        <button onClick={saveCode} disabled={isSaved} className="save-button">
                            Save Code
                        </button>
                        <button onClick={unsaveCode} disabled={!editedSinceJoin.current} className="unsave-button">
                            Unsave Code
                        </button>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="chat-section">
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
