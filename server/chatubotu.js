class ChatuBotu {
  constructor(name = 'ChatuBotu', color = 'Green') {
    this.name = name;
    this.color = color;
  }

  findPossibleAnswer(question) {
    // do magic elastic search here

    return 'I have no clue :)';
  }
}

module.exports = ChatuBotu;
