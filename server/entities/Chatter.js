class Chatter {
  constructor(socket, name, nameColor) {
    this.name = name;
    this.nameColor = nameColor || 'red';
    this.socket = socket;
    this.bits = 1;
  }

  getProfile() {
    return {
      name: this.name,
      nameColor: this.nameColor,
      bits: this.bits
    };
  }

  increaseBits() {
    this.bits++;
  }

  cleanup() {}
}

module.exports = Chatter;
