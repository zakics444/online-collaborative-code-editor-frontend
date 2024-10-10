import { io } from 'socket.io-client';

// Dynamically connect to the backend WebSocket server
const socket = io(process.env.REACT_APP_API_URL || 'https://online-collaborative-code-editor-backend.onrender.com/api');

export default socket;