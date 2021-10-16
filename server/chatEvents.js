const shortid = require('shortid');

const setupChatEvents = (io) => {
    io.on('connection', (socket) => {
      console.log('Incomming Connection');
      io.emit('message', {
        id: shortid.generate(),
        author: 'Server',
        nameColor: 'yellow',
        message: 'Someone has joined',
        badges: []
      });

      socket.on('message', message => {
        io.emit('message', {
          ...message,
          id: shortid.generate()
        });
      })
    });
  };
  
  module.exports = setupChatEvents;