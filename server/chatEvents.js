const setupChatEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Incomming Connection');
  });
};

module.exports = setupChatEvents;
