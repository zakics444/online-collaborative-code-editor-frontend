import React, { useState } from 'react';
import axios from '../services/axios';  // Make sure axios is properly set up for API calls
import { useNavigate } from 'react-router-dom';  // For navigation after project creation/joining

const Project = () => {
    const [projectData, setProjectData] = useState({ projectName: '', password: '' });
    const navigate = useNavigate();  // For redirecting after project creation or joining

    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    // Create Project (with token in the header)
    const handleCreateProject = async () => {
        const token = localStorage.getItem('token');  // Get the token from local storage
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`  // Send token in the Authorization header
            }
        };

        try {
            // Make the POST request to create the project
            await axios.post('/projects/create', projectData, config);
            navigate('/editor');  // Redirect to the editor after successful project creation
        } catch (error) {
            console.error('Error creating project', error);  // Handle error if project creation fails
        }
    };

    // Join Project (with token in the header)
    const handleJoinProject = async () => {
        const token = localStorage.getItem('token');  // Get the token from local storage
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`  // Send token in the Authorization header
            }
        };

        try {
            // Make the POST request to join the project
            await axios.post('/projects/join', projectData, config);
            navigate('/editor');  // Redirect to the editor after joining the project
        } catch (error) {
            console.error('Error joining project', error);  // Handle error if project joining fails
        }
    };

    return (
        <div>
            <h2>Create or Join a Project</h2>
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
            <button onClick={handleCreateProject}>Create Project</button>
            <button onClick={handleJoinProject}>Join Project</button>
        </div>
    );
};

export default Project;
