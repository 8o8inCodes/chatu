import { html } from './base';
import { Message } from '.';

/**
 * Draw a feature we did once by name.
 */
export function ChatArea({
  /**
   * the feature name which produce link and image.
   * @type {Array}
   */
  messages
}) {
  return html`
    <div class="chatArea">
      ${messages.map((message) => Message({ message }))}
    </div>
  `;
}
