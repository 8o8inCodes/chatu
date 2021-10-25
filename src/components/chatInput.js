import { html } from './base';
import { useState, useEffect } from 'haunted';

export function ChatInput({ onSend, placeholder }) {
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
        class="chatInput"
        type="text"
        placeholder=${placeholder}
        @keypress=${handleKeyPress}
        .value=${value}
        @input=${(e) => setValue(e.target.value)}
      />
    </div>
  `;
}
