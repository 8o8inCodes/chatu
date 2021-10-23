import { html } from './base';
import { useState, useEffect } from 'haunted';

/**
 * Draw a feature we did once by name.
 */
export function ChatInput({ onNameChange, onSend, username }) {
  const [value, setValue] = useState('');
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSend(value);
      setValue('');
    }
  };

  return html`
    <div class="chatInputContainer">
      <input
        class="nameInput"
        type="text"
        placeholder="Name"
        .value=${username}
        @input=${(e) => onNameChange(e.target.value)}
      />
      <input
        class="chatInput"
        type="text"
        placeholder="Chat message"
        @keypress=${handleKeyPress}
        .value=${value}
        @input=${(e) => setValue(e.target.value)}
      />
    </div>
  `;
}
