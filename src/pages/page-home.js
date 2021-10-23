import { html, render } from 'lit';
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import haunted, { useState, useEffect, useRef } from 'haunted';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatArea } from '../components';
import { ChatInput } from '../components';
import useStateRef from '../helpers/useStateRef';

function PageHome() {
  const [username, setUsername, nameref] = useStateRef('Guest');
  const [messageGroups, setMessageGroups, ref] = useStateRef([]);
  const socket = useRef();

  const handleChat = (message) => {
    if (message.author === nameref.current) {
      message = {
        ...message,
        self: true
      };
    }
    console.log('received message', message, username);
    let msgGroups = ref.current;

    let lastGroup = msgGroups[msgGroups.length - 1];
    if (lastGroup && lastGroup[0].author === message.author) {
      delete message['author'];
      setMessageGroups([
        ...msgGroups.slice(0, msgGroups.length - 1),
        [...lastGroup, message]
      ]);
    } else {
      setMessageGroups([...msgGroups, [message]]);
    }
  };

  const sendMessage = (message) => {
    socket.current.emit('message', {
      author: username,
      nameColor: 'red',
      message
    });
  };

  useEffect(() => {
    socket.current = io(':8080');
    socket.current.on('message', handleChat);
    return () => {
      socket.current.close();
    };
  }, []);

  return html`
    <div class="chatContainer">
      ${ChatArea({
        messageGroups
      })}
      ${ChatInput({ onSend: sendMessage, onNameChange: setUsername, username })}
    </div>
  `;
}

const { component } = haunted({ render });
customElements.define(
  'page-home',
  component(PageHome, { useShadowDOM: false })
);
