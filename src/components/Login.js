import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // Error handling state
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);  // Reset error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Show loading state

        try {
            const response = await axios.post('/auth/login', formData);  // Login API call
            localStorage.setItem('token', response.data.token);  // Save token in localStorage
            setLoading(false);  // Stop loading
            navigate('/project');  // Redirect to project page after login
        } catch (error) {
            setLoading(false);  // Stop loading
            setError(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message */}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
};

export default Login;
