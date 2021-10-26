const commands = require('./commands');

/**
 * Converts string into command with arguments
 * @param {String} str String command to convert
 * @returns {Object} {
 *  command {String} - Command it's self
 *  args {Array} - Array of arguments
 * }
 */
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
 * @param {String} data - Command to run
 * @param {Object} context - Object that contains
 *  io - Socket server
 *  socket - Socket client connection
 *  chatter - Chatter object
 *  chatters - Object of chatters
 *  sendServerMsg - Function that sends a message to all the clients
 *  sendClientMsg - Function that sends a message to current client
 */
const handleCommand = (data, context) => {
  const { sendClientMsg } = context;

  cmd = buildCommand(data);

  // prepare a help command
  const help = () => {
    let res = '';
    res += `Command list: \n`;
    for (let command in commands) {
      res += `/${command} - ${commands[command].description} \n`;
    }
    sendClientMsg(res);
  };

  if (cmd.command === 'help') {
    help();
    return;
  }

  // Prepare execution function
  const execute = commands[cmd.command];

  // Validate the command and try to run it
  // Fail gracefully in case there is a bug in the system
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
    sendClientMsg(err.message);
  }
};

module.exports = handleCommand;
