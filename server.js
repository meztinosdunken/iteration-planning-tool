const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware setup
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB with appropriate options
mongoose.connect('mongodb://localhost:27017/iteration-planning', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic API endpoint
app.get('/', (req, res) => {
  res.send('Iteration Planning Tool API');
});

// Socket.io connection setup
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});