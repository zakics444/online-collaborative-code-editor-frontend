import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Project from './components/Project';
import Editor from './components/Editor';
import Chat from './components/Chat';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Sign-up and Login Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Project Creation/Joining */}
                <Route path="/project" element={isAuthenticated ? <Project /> : <Navigate to="/login" />} />

                {/* Editor and Chat */}
                <Route path="/editor" element={isAuthenticated ? <Editor /> : <Navigate to="/login" />} />
                <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />

                {/* Redirect to login if no other routes match */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
