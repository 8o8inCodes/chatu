import { html } from './base';

/**
 * Draw a feature we did once by name.
 */
export function Message({
  /**
   * the feature name which produce link and image.
   * @type {Object}
   */
  message
}) {
  return html`
    <div class="messageContainer">
      <p>
        <label style="color: ${message.nameColor}">${message.author} </label>:
        ${message.message}
      </p>
    </div>
  `;
}
