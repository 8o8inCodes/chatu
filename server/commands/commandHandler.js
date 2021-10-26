const shortid = require('./commands');
const commands = require('./commands');

const buildCommand = (str) => {
  const splitted = str.replace('/', '').split(' ');
  const command = {
    command: splitted[0],
    args: splitted.slice(1, splitted.length)
  };
  return command;
};

/**
 * Handles a text command
 * @param {String} command - Command to run
 * @param {Object} context - Object that contains
 *  io - Socket server
 *  socket - Socket client connection
 *  chatter - Chatter object
 *  chatters - Object of chatters
 */
const handleCommand = (data, context) => {
  const { io, socket, sendServerMsg } = context;

  cmd = buildCommand(data);

  // Add a way to register new lines in the chat bubbles
  const help = () => {
    let res = '';
    res += `Command list: \n`;
    for (let command in commands) {
      res += `/${command} - ${commands[command].description} \n`;
    }
    sendServerMsg(res);
  };

  if (cmd.command === 'help') {
    help();
    return;
  }

  const execute = commands[cmd.command];
  try {
    if (execute) {
      if (cmd.args && Array.isArray(cmd.args)) {
        execute.execution(...cmd.args, context);
      } else {
        execute.execution(context);
      }
    }
  } catch (err) {
    console.log(err);
    sendServerMsg(err.message);
  }
};

module.exports = handleCommand;
