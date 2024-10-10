import { io } from 'socket.io-client';

// Dynamically connect to the backend WebSocket server
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export default socket;