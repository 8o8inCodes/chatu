import { html } from 'lit';
import { io } from 'socket.io-client';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatArea } from '../components';
import { ChatInput } from '../components';

export class PageHome extends PageElement {
  static properties = {
    messages: { type: Array }
    // socket: { type: Socket }
  };

  constructor() {
    super();
    this.messages = [
      {
        author: 'Bob',
        nameColor: 'red',
        message: 'Hello people!',
        badges: []
      }
    ];

    // this.socket = io();

    // this.socket.on('message', this.addMessage);
  }

  addMessage(msg) {
    this.messages = {
      ...this.messages,
      msg
    };
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
