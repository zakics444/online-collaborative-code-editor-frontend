import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');  // Error handling
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Reset error message

        try {
            const response = await axios.post('/auth/signup', formData);  // Make the signup request
            localStorage.setItem('token', response.data.token);  // Store the token
            setIsAuthenticated(true);  // Set the user as authenticated
            navigate('/project');  // Redirect to the project page
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Signup failed. Please try again.');  // Display an error message if signup fails
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Signup;
