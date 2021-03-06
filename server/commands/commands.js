// Setup all the commands here
module.exports = {
  bits: {
    description: 'Shows your current bits.',
    execution: ({ sendServerMsg, chatter }) => {
      sendServerMsg(`@${chatter.name} has ${chatter.bits} bits.`);
    }
  },
  upgrades: {
    description: 'Shows your current upgrades.',
    execution: ({ sendClientMsg, chatter }) => {
      let message = `@${chatter.name} you have following items: \n`;
      for (const upgradeIndex in chatter.upgrades) {
        message += '============== \n';
        const upgrade = chatter.upgrades[upgradeIndex];
        message += `${upgrade.name} - ${upgrade.description} \n`;
        if (upgrade.bitsPerMessageAfterUpgrade) {
          message += `Bits per message: ${upgrade.bitsPerMessage} \n`;
          message += `Bits per message after upgrade: ${upgrade.bitsPerMessageAfterUpgrade} \n`;
        }
        if (upgrade.bitsPerSecondAfterUpgrade) {
          message += `Bits per second: ${upgrade.bitsPerSecond} \n`;
          message += `Bits per second after upgrade: ${upgrade.bitsPerSecondAfterUpgrade} \n`;
        }
        message += `Next upgrade costs: ${upgrade.upgradeCost} bits\n`;
      }
      sendClientMsg(message);
    }
  },
  upgrade: {
    description: 'Upgrades a specific upgrade. example: /upgrade chatter',
    execution: (upgradeName, { sendClientMsg, chatter }) => {
      sendClientMsg(chatter.purchaseUpgrade(upgradeName));
    }
  }
};
