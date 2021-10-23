const elasticsearch = require('elasticsearch');

class ChatuBotu {
  constructor(name = 'ChatuBotu', color = 'Green') {
    this.name = name;
    this.color = color;
    this.waitingForAnswer = null;
    this.ready = false;

    this.client = new elasticsearch.Client({
      host: process.env.ELASTICSEARCH_HOST,
      apiVersion: '7.x'
    });
    this.client.ping(
      {
        requestTimeout: 1000
      },
      (error) => {
        if (error) {
          console.trace('elasticsearch cluster is down!');
        } else {
          console.log(`Bot connected to ${process.env.ELASTICSEARCH_HOST}`);
        }
      }
    );

    this.setupDataset();
  }

  async setupDataset() {
    try {
      await this.client.cat.indices({
        index: 'questions',
        format: 'json'
      });
    } catch (error) {
      try {
        console.log("index doesn't exist, creating...");
        await this.client.index({
          index: 'questions',
          body: {}
        });
        console.log('index "questions" created successfully.');
      } catch (creationError) {
        console.log(creationError);
      }
    }
  }

  async addAnswer(answer) {
    if (!ready) return;
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
    if (!ready) return;
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
