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
  const [messageGroups, setMessageGroups, ref] = useStateRef([]);
  const [profile, setProfile, profileRef] = useStateRef();
  const socket = useRef();

  const handleChat = (message) => {
    if (message.author === profileRef.current?.name) {
      message = {
        ...message,
        self: true
      };
    }
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

  const handleSend = (text) => {
    if (text || text.length <= 0) return;
    if (profile) {
      socket.current.emit('message', {
        message: text
      });
    } else {
      socket.current.emit('login', {
        name: text,
        nameColor: 'red' // Might add a color selector in the future.
      });
    }
  };

  useEffect(() => {
    // Temoporary hardcoded port, inorder for it to connect to the real running server instead of
    // the web-dev-server. This would've been easier to do in webpack dev server since they provide
    // an option to setup a proxy. In web-dev-server the socket proxy doesn't work. Requires further research.
    socket.current = io(':8080');
    socket.current.on('message', handleChat);
    socket.current.on('profile', setProfile);
    socket.current.on('disconnect', () =>
      handleChat({
        author: 'Server',
        nameColor: 'yellow',
        message: 'You have been disconnected from the chat.'
      })
    );
    return () => {
      socket.current.close();
    };
  }, []);

  return html`
    <div class="chatContainer">
      ${ChatArea({
        messageGroups
      })}
      ${ChatInput({
        onSend: handleSend,
        placeholder: profile
          ? 'Send Message'
          : 'Enter your username in order to join the chat.'
      })}
    </div>
  `;
}

const { component } = haunted({ render });
customElements.define(
  'page-home',
  component(PageHome, { useShadowDOM: false })
);
