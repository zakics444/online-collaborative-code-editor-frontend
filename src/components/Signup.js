import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';  // Import the CSS file for styling

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/signup`,  // Ensure correct backend URL
                formData
            );
            console.log('Signup Response:', response.data);
            alert('Signup successful!');
        } catch (err) {
            // Logging the full error response for debugging
            console.error('Signup failed:', err.response ? err.response.data : err.message);
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Signup failed: Unknown error');
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="signup-button">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
