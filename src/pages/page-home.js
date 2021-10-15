import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatArea } from '../components';
import { ChatInput } from '../components';

export class PageHome extends PageElement {
  static properties = {
    messages: { type: Array }
  };

  constructor() {
    super();
    this.messages = [
      {
        author: 'Bob',
        nameColor: 'red',
        message: 'Hello people!',
        badges: []
      },
      {
        author: 'Bob',
        nameColor: 'red',
        message: 'How are you?',
        badges: []
      }
    ];
    for (let i = 0; i < 3; i++) {
      this.messages = [...this.messages, ...this.messages];
    }
    // Initiate socket connection
    console.log(this.messages);
  }

  render() {
    return html`
      <div class="chatContainer">
        ${ChatArea({
          messages: this.messages
        })}
        ${ChatInput()}
      </div>
    `;
  }
}

customElements.define('page-home', PageHome);
