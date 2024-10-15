import React, { useState } from 'react';
import axios from '../services/axios';  // Using the axios instance for API calls
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file for styling

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();  // Used to navigate between pages

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', formData);  // Sending login request to backend
            localStorage.setItem('token', response.data.token);  // Store token in local storage
            navigate('/project');  // Redirect to project creation/join page after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>Don't have an account? <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button></p>
        </div>
    );
};

export default Login;
