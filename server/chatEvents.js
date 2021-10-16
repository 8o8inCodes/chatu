const setupChatEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Incomming Connection');
    io.emit('message', {
      author: 'Server',
      nameColor: 'yellow',
      message: 'Someone has joined',
      badges: []
    });
  });
};

module.exports = setupChatEvents;
