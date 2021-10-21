const shortid = require('shortid');
const ChatuBotu = require('./chatubotu');
const bot = new ChatuBotu();

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

    socket.on('message', (message) => {
      io.emit('message', {
        ...message,
        id: shortid.generate()
      });

      if (message?.message.trim().endsWith('?')) {
        const answer = bot.findPossibleAnswer(message.message);
        if (answer) {
          io.emit('message', {
            id: shortid.generate(),
            author: bot.name,
            nameColor: bot.color,
            message: answer,
            badges: []
          });
        }
      }
    });
  });
};

module.exports = setupChatEvents;
