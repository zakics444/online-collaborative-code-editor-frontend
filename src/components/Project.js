import React, { useState } from 'react';
import axios from '../services/axios';  // Make sure axios is properly set up for API calls
import { useNavigate } from 'react-router-dom';
import './Project.css';  // Import the CSS file for styling

const Project = () => {
    const [projectData, setProjectData] = useState({ projectName: '', pjpassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleCreateProject = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post('/projects/create', projectData, config);
            console.log('Project created successfully:', response.data);
            navigate('/editor', { state: { projectName: projectData.projectName, pjpassword: projectData.pjpassword } });
        } catch (error) {
            console.error('Error creating project', error);
            setError(error.response?.data?.error || 'Error creating project');
        }
    };

    const handleJoinProject = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post('/projects/join', projectData, config);
            console.log('Joined project successfully:', response.data);
            navigate('/editor', { state: { projectName: projectData.projectName, pjpassword: projectData.pjpassword } });
        } catch (error) {
            console.error('Error joining project', error);
            setError(error.response?.data?.error || 'Error joining project');
        }
    };

    return (
        <div className="project-container">
            <h2>Create or Join a Project</h2>
            {error && <p className="error-message">{error}</p>}
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
                name="pjpassword"
                placeholder="Password"
                value={projectData.pjpassword}
                onChange={handleInputChange}
                required
            />
            <div className="button-group">
                <button onClick={handleCreateProject} className="create-button">Create Project</button>
                <button onClick={handleJoinProject} className="join-button">Join Project</button>
            </div>
        </div>
    );
};

export default Project;
