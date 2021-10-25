module.exports = {
  bits: {
    description: 'Shows your current bits.',
    execution: ({ sendServerMsg, chatter }) => {
      // send bits
      sendServerMsg(`@${chatter.name} has ${chatter.bits} bits.`);
    }
  }
};
