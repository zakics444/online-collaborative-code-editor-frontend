import React, { useState } from 'react';
import axios from '../services/axios';  // Using the axios instance for API calls
import { useHistory } from 'react-router-dom';

const Project = () => {
    const [projectData, setProjectData] = useState({ projectName: '', password: '' });
    const [loading, setLoading] = useState(false);  // Loading state for preventing multiple submissions
    const [error, setError] = useState(null);  // Error state for displaying errors
    const history = useHistory();

    // Handle form input changes
    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    // Handle project creation
    const handleCreateProject = async () => {
        setLoading(true);  // Set loading state to true during the API call
        setError(null);  // Reset error state before making the API call
        try {
            await axios.post('/projects/create', projectData);  // API request to create project
            history.push('/editor');  // Redirect to the editor after project creation
        } catch (error) {
            console.error('Error creating project:', error);
            setError('Failed to create project. Please try again.');  // Set an error message
        } finally {
            setLoading(false);  // Stop loading state after the API call
        }
    };

    // Handle project joining
    const handleJoinProject = async () => {
        setLoading(true);  // Set loading state to true during the API call
        setError(null);  // Reset error state before making the API call
        try {
            await axios.post('/projects/join', projectData);  // API request to join a project
            history.push('/editor');  // Redirect to the editor after joining a project
        } catch (error) {
            console.error('Error joining project:', error);
            setError('Failed to join project. Please try again.');  // Set an error message
        } finally {
            setLoading(false);  // Stop loading state after the API call
        }
    };

    return (
        <div>
            <h2>Create or Join a Project</h2>
            
            {/* Display error messages if there are any */}
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

            {/* Buttons are disabled when loading to prevent multiple submissions */}
            <button onClick={handleCreateProject} disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
            </button>
            <button onClick={handleJoinProject} disabled={loading}>
                {loading ? 'Joining...' : 'Join Project'}
            </button>
        </div>
    );
};

export default Project;
