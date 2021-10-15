const path = require('path');
const express = require('express');
const socketServer = require('socket.io');
const setupChatEvents = require('./chatEvents.js');

const app = express();
const port = process.env.PORT || 8080;

// Logging every request
app.use('*', (req, res, next) => {
  console.log(req.method, req.baseUrl, req.body);
  next();
});

app.use('/', express.static(path.join(__dirname, '/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const server = app.listen(port);
console.log(`Listening on port ${port}`);

const io = socketServer(server);
setupChatEvents(io);
