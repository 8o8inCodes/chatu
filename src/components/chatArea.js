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
  messageGroups
}) {
  let bottomRef = document.querySelector('#bottomRef');

  useEffect(() => {
    scrollToBottom();
  }, [messageGroups]);

  const scrollToBottom = () => {
    if (!bottomRef) return;
    bottomRef.scrollIntoView({
      behavior: 'auto',
      block: 'start'
    });
  };
  return html`
    <div class="chatArea">
      ${messageGroups.map(
        (messages) => html`
          <div class="messageGroup">
            ${messages.map((message) => Message({ message }))}
          </div>
        `
      )}
      <div id="bottomRef" class="list-bottom"></div>
    </div>
  `;
}
