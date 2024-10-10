import React, { useState } from 'react';
import axios from '../services/axios';  // Using the axios instance for API calls
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const [projectData, setProjectData] = useState({ projectName: '', password: '' });
    const [loading, setLoading] = useState(false);  // Loading state for UI feedback
    const [error, setError] = useState(null);  // Error state for handling errors
    const navigate = useNavigate();  // useNavigate hook for programmatic navigation

    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
        setError(null);  // Clear previous errors on input change
    };

    const handleCreateProject = async () => {
        setLoading(true);  // Start loading

        console.log("Sending project creation request with data:", projectData);  // Debugging log

        try {
            const response = await axios.post('/projects/create', projectData);
            console.log("Create project response:", response);  // Debugging log
            
            setLoading(false);  // Stop loading

            if (response.status === 201) {
                navigate('/editor');  // Redirect to editor after project creation
            }
        } catch (error) {
            setLoading(false);  // Stop loading
            console.error("Error in project creation:", error);  // Debugging log
            setError(error.response?.data?.error || 'Failed to create project.');
        }
    };

    const handleJoinProject = async () => {
        setLoading(true);  // Start loading

        console.log("Joining project with data:", projectData);  // Debugging log

        try {
            const response = await axios.post('/projects/join', projectData);
            console.log("Join project response:", response);  // Debugging log
            
            setLoading(false);  // Stop loading

            if (response.status === 200) {
                navigate('/editor');  // Redirect to editor after joining project
            }
        } catch (error) {
            setLoading(false);  // Stop loading
            console.error('Error joining project:', error);  // Debugging log
            setError(error.response?.data?.error || 'Failed to join project.');
        }
    };

    return (
        <div>
            <h2>Create or Join a Project</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={projectData.projectName}
                onChange={handleInputChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={projectData.password}
                onChange={handleInputChange}
                required
            />
            <button onClick={handleCreateProject} disabled={loading}>
                {loading ? 'Creating Project...' : 'Create Project'}
            </button>
            <button onClick={handleJoinProject} disabled={loading}>
                {loading ? 'Joining Project...' : 'Join Project'}
            </button>
        </div>
    );
};

export default Project;
