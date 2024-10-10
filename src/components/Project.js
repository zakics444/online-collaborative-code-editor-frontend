import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const [projectData, setProjectData] = useState({ projectName: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleCreateProject = async () => {
        console.log("Creating project with data:", projectData);  // Debugging log

        try {
            const response = await axios.post('/projects/create', projectData);
            console.log("Create project response:", response);  // Debugging log
            if (response.status === 201) {
                navigate('/editor');  // Navigate to editor if the project is created
            }
        } catch (error) {
            console.error('Error creating project', error);
            alert('Failed to create project. Check the console for errors.');
        }
    };

    const handleJoinProject = async () => {
        console.log("Joining project with data:", projectData);  // Debugging log

        try {
            const response = await axios.post('/projects/join', projectData);
            console.log("Join project response:", response);  // Debugging log
            if (response.status === 200) {
                navigate('/editor');  // Navigate to editor if project is joined
            }
        } catch (error) {
            console.error('Error joining project', error);
            alert('Failed to join project. Check the console for errors.');
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
