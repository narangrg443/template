const express = require('express');
const http = require('http');
const chokidar = require('chokidar');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');
});

// Watch for changes in the public directory
const watcher = chokidar.watch(path.join(__dirname, 'public'));

watcher.on('change', (filePath) => {
  console.log(`${filePath} has changed. Reloading...`);
  io.emit('reload'); // Emit a reload event to connected clients
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
