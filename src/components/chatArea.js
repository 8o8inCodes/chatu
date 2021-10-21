import { html } from './base';
import { useState, useRef, useEffect } from 'haunted/core';
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
  let bottomRef = document.querySelector('#bottomRef');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (!bottomRef) return;
    bottomRef.scrollIntoView({
      behavior: 'auto',
      block: 'start'
    });
  };
  return html`
    <div class="chatArea">
      ${messages.map((message) => Message({ message }))}
      <div id="bottomRef" class="list-bottom"></div>
    </div>
  `;
}
