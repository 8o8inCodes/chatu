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

      if (
        message.message.trim().endsWith('?') ||
        message.message.includes(`@${bot.name}`)
      ) {
        const parsedMessage = message.message.replace(/\B@\w+/g, '').trim();
        const answer = await bot.findPossibleAnswer(parsedMessage);
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
