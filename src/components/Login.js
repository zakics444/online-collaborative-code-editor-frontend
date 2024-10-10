import React, { useState } from 'react';
import axios from '../services/axios';  // Using the axios instance for API calls
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request
            const response = await axios.post('/auth/login', formData);  
            
            // Store token in localStorage if login is successful
            localStorage.setItem('token', response.data.token);
            navigate('/project');  // Redirect to the project page after login
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
