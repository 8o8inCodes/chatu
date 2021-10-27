const shortid = require('shortid');
const ChatuBotu = require('./chatubotu');
const Chatter = require('./entities/Chatter');
const handleCommand = require('./commands/commandHandler');
// I'd pass the bot name from the environment vars
const bot = new ChatuBotu();

let chatters = {
  Server: {}, // reserved for the server it's self
  [bot.name]: bot
};

// Updates all the chatters that contain an update function
setInterval(() => {
  for (const chatterIndex in chatters) {
    const chatter = chatters[chatterIndex];
    if (chatter && chatter.update) {
      chatter.update();
    }
  }
}, 1000);

/**
 * Sets up the following chat events:
 * connection - Whenever there is a new socket connection
 * - login - Whenever socket client sent login information
 * - - message - Whenever a logged user sends a chat message
 * disconnect - Whenever socket disconnects, it cleans everything related to the client up.
 * @param {SocketServer} io - Socket server
 */
const setupChatEvents = (io) => {
  const sendServerMsg = (msg) => {
    io.emit('message', {
      id: shortid.generate(),
      author: 'Server',
      nameColor: 'yellow',
      message: msg
    });
  };
  io.on('connection', (socket) => {
    let chatter;
    const sendClientMsg = (msg) => {
      socket.emit('message', {
        id: shortid.generate(),
        author: 'Server',
        nameColor: 'yellow',
        message: msg
      });
    };
    console.log('Incomming Connection');

    socket.on('login', (data) => {
      const { name, color } = data;

      if (!/^[a-zA-Z\-0-9]+$/.test(name)) {
        sendClientMsg('Error: Invalid Username');
        return;
      }
      // In real life I would use an authentication system instead
      // of using just the name as a unique identifier.
      if (chatters[name]) {
        sendClientMsg('Error: User with such name is already in the chat.');
        return;
      }

      chatter = new Chatter(socket, name, color);
      chatters[name] = chatter;
      setupChat(io, socket, chatter, sendServerMsg, sendClientMsg);

      socket.emit('profile', chatter.getProfile());
      sendServerMsg(`Please welcome ${chatter.name}!`);
    });

    socket.on('disconnect', () => {
      // remove chatter from the chatters object
      if (!chatter) return;
      let { [chatter.name]: omit, ...res } = chatters;
      chatters = res;
      sendServerMsg(`${chatter.name} has been disconnected!`);
    });
  });
};

const setupChat = (io, socket, chatter, sendServerMsg, sendClientMsg) => {
  socket.on('message', async (message) => {
    if (!message.message || message.message.length <= 0) return;
    if (message.message.startsWith('/')) {
      handleCommand(message.message, {
        io,
        socket,
        chatter,
        chatters,
        sendServerMsg,
        sendClientMsg
      });
      return;
    }

    // Increase bits every time there is a chat message.
    // I would add some sort of an anti spam mechanism so that people
    // wont abuse the system.
    chatter.increaseBits();
    io.emit('message', {
      message: message.message,
      id: shortid.generate(),
      nameColor: chatter.nameColor,
      author: chatter.name
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
};

module.exports = setupChatEvents;
