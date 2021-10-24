const elasticsearch = require('elasticsearch');
const botData = require('./BotDataSet/questions.json');

class ChatuBotu {
  constructor(name = 'BobThePirate', color = 'red') {
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
        const body = botData.flatMap((doc) => [
          { index: { _index: 'questions' } },
          doc
        ]);
        await this.client.bulk({ refresh: true, body });
      } catch (creationError) {
        console.log(creationError);
      }
    }
    this.ready = true;
  }

  async addAnswer(answer) {
    if (!this.ready) return;
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
    if (!this.ready) return;
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
      let answer = res.hits.hits[0]._source.answer;
      if (answer instanceof Array) {
        answer = answer[Math.floor(Math.random() * answer.length)];
      }
      return answer;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ChatuBotu;
