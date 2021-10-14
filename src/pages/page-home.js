import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';

export class PageHome extends PageElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <header class="">
        <div>
          <h1>Hello world</h1>
        </div>
      </header>
    `;
  }
}

customElements.define('page-home', PageHome);
