import { html } from './base';
import { useState, useEffect } from 'haunted';

/**
 * Draw a feature we did once by name.
 */
export function ChatInput({ onNameChange, onSend }) {
  const [value, setValue] = useState('');
  const [nameValue, setNameValue] = useState('Guest');
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSend(value);
      setValue('');
    }
  };

  useEffect(() => {
    onNameChange(nameValue);
  }, [nameValue, onNameChange]);

  return html`
    <div class="chatInputContainer">
      <input
        class="nameInput"
        type="text"
        placeholder="Name"
        .value=${nameValue}
        @input=${(e) => setNameValue(e.target.value)}
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
