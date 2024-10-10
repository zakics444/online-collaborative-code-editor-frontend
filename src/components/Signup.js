import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // For handling errors
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);  // Reset error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Show loading state

        try {
            const response = await axios.post('/auth/signup', formData);
            localStorage.setItem('token', response.data.token);  // Save the token
            setLoading(false);  // Hide loading
            navigate('/project');  // Redirect to project creation/join page
        } catch (error) {
            setLoading(false);  // Hide loading
            setError(error.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message if exists */}
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

