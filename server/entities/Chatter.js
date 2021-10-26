class Chatter {
  constructor(socket, name, nameColor) {
    this.name = name;
    this.nameColor = nameColor || 'red';
    this.socket = socket;
    this.bits = 1;
    this.bitsGathered = 0;

    this.upgrades = {
      chatter: {
        name: 'chatter',
        description: 'Gets you bits for every message',
        bitsPerMessage: 1,
        upgradeCost: 5
      }
    };
  }

  getProfile() {
    return {
      name: this.name,
      nameColor: this.nameColor,
      bits: this.bits
    };
  }

  increaseBits() {
    this.bits += this.upgrades.chatter.bitsPerMessage;
    this.bitsGathered++;
  }

  purchaseUpgrade(upgradeName) {
    const upgrade = this.upgrades[upgradeName];
    if (!upgrade) return 'Such upgrade is not available';
    if (this.bits - upgrade.upgradeCost < 0)
      return "You don't have enough bits";
    this.bits -= upgrade.upgradeCost;
    if (upgrade.bitsPerMessage) upgrade.bitsPerMessage *= 2;
    if (upgrade.bitsPerSecond) upgrade.bitsPerSecond *= 2;
    upgrade.upgradeCost *= 3;
    return `@${this.name} ${upgrade.name} upgraded successfully. Current bits: ${this.bits}`;
  }

  update() {
    // this.bits
  }

  cleanup() {}
}

module.exports = Chatter;
