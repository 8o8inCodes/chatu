import { html } from './base';

/**
 * Draw a feature we did once by name.
 */
export function ChatInput() {
  return html`
    <div class="chatInputContainer">
      <input class="chatInput" type="text" placeholder="Chat message" />
    </div>
  `;
}
