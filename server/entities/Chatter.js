/**
 * Chatter class represents a chat client/user
 * Contains a minigame "Bits" with upgrades.
 */
class Chatter {
  /**
   * Constructor for the chatter class
   * Setups an initial upgrade state.
   * @param {Socket} socket - Socket client
   * @param {String} name - Client/User name
   * @param {String} nameColor - Name tag's color
   */
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

  /**
   * Builds a safe object without any private information.
   * @returns {Object} - Safe to send object to othe client.
   */
  getProfile() {
    return {
      name: this.name,
      nameColor: this.nameColor,
      bits: this.bits
    };
  }

  /**
   * Increases Bits using the upgrades "Per Message"
   */
  increaseBits() {
    for (const upgradeIndex in this.upgrades) {
      const upgrade = this.upgrades[upgradeIndex];
      if (upgrade.bitsPerMessage) {
        this.bits += upgrade.bitsPerMessage;
        this.bitsGathered += upgrade.bitsPerMessage;
      }
    }
  }

  /**
   * Upgrade provided upgrade.
   * Deducts the upgrade's price from the user's current bits
   * @param {String} upgradeName - Upgrade's name to purchase
   * @returns {String} - Output message
   */
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

  /**
   * Everytime this called, should upgrade "Bits Per Second"
   * in the future
   */
  update() {}
}

module.exports = Chatter;
