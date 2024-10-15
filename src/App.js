import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Project from './components/Project';  // Create this component for project creation or joining
import Editor from './components/Editor';   // Editor will be used after creating/joining a project

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // Track if user is authenticated

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');  // Check if a token exists in local storage
        if (token) {
            setIsAuthenticated(true);  // Set authenticated if token exists
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Signup/Login Routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Project page, only accessible if authenticated */}
                <Route path="/project" element={isAuthenticated ? <Project /> : <Navigate to="/login" />} />

                {/* Editor page, only accessible if authenticated */}
                <Route path="/editor" element={isAuthenticated ? <Editor /> : <Navigate to="/login" />} />

                {/* Redirect to login if no other routes match */}
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
