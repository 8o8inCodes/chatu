const elasticsearch = require('elasticsearch');

class ChatuBotu {
  constructor(name = 'ChatuBotu', color = 'Green') {
    this.name = name;
    this.color = color;
    this.waitingForAnswer = null;

    this.client = new elasticsearch.Client({
      host: process.env.ELASTICSEARCH_HOST,
      apiVersion: '7.x'
    });
    this.client.ping(
      {
        requestTimeout: 1000
      },
      function (error) {
        if (error) {
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log(`Bot connected to ${process.env.ELASTICSEARCH_HOST}`);
        }
      }
    );
  }

  async addAnswer(answer) {
    try {
      await this.client.index({
        index: 'questions',
        body: {
          question: this.waitingForAnswer,
          answer
        }
      });
      this.waitingForAnswer = null;
    } catch (err) {
      console.log(err);
    }
  }

  async findPossibleAnswer(question) {
    try {
      const res = await this.client.search({
        index: 'questions',
        body: {
          query: {
            match_phrase: {
              question: {
                query: question
              }
            }
          }
        }
      });
      if (!res.hits.max_score) {
        this.waitingForAnswer = question;
        return 'Waiting for an answer..';
      }
      return res.hits.hits[0]._source.answer;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ChatuBotu;
