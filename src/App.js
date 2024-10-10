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
            setIsAuthenticated(true); // If a token exists, the user is authenticated
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Login and Signup Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Project creation and joining routes */}
                <Route path="/project" element={isAuthenticated ? <Project /> : <Navigate to="/login" />} />

                {/* Editor and Chat routes */}
                <Route path="/editor" element={isAuthenticated ? <Editor /> : <Navigate to="/login" />} />
                <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />

                {/* Default route should redirect to login */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
