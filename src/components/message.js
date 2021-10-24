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
  let className = 'messageContainer';
  if (message.self) {
    className += ' selfMessage';
  }

  return html`
    <div class=${className}>
      <p>
        ${message.author &&
        html`
          <label class="messageName" style="color: ${message.nameColor};">
            ${message.author}
          </label>
        `}
        <label>
          ${message.message.split(' ').map((word) => {
            if (word.startsWith('@')) {
              return html`<span class="mention">${word} </span>`;
            }
            return `${word} `;
          })}
        </label>
      </p>
    </div>
  `;
}
