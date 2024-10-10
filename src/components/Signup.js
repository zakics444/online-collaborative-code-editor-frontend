import React, { useState } from 'react';
import axios from '../services/axios';  // Using the axios instance for API calls
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);  // Loading state to prevent multiple submissions
    const [error, setError] = useState(null);  // Error state for displaying errors
    const history = useHistory();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Reset error state before making the API call

        try {
            const response = await axios.post('/auth/signup', formData);  // API request for signup
            localStorage.setItem('token', response.data.token);  // Store JWT token
            history.push('/project');  // Redirect to the project page after successful signup
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Failed to sign up. Please try again.');  // Set a user-friendly error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;

