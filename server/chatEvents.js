const shortid = require('shortid');
const ChatuBotu = require('./chatubotu');
const bot = new ChatuBotu();

const setupChatEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('Incomming Connection');
    socket.on('message', async (message) => {
      io.emit('message', {
        ...message,
        id: shortid.generate()
      });

      if (message.message.trim().endsWith('?')) {
        const answer = await bot.findPossibleAnswer(message.message);
        if (answer) {
          io.emit('message', {
            id: shortid.generate(),
            author: bot.name,
            nameColor: bot.color,
            message: answer,
            badges: []
          });
        }
      } else if (bot.waitingForAnswer) {
        bot.addAnswer(message.message);
      }
    });
  });
};

module.exports = setupChatEvents;
