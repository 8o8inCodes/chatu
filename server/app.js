const path = require('path');
require('dotenv').config();
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

let socketOptions = {};

// If environment isn't in production, then disable cors in order
// to develop everything faster with hot reloading.
if (process.env.ENVIRONMENT !== 'production') {
  console.log('Disabling socket cors');
  socketOptions = {
    cors: {
      origin: '*'
    }
  };
}

const io = socketServer(server, socketOptions);

setupChatEvents(io);
