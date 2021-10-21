import { html, render } from 'lit';
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import haunted, { useState, useEffect, useRef } from 'haunted';
// import { io } from 'socket.io-client';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatArea } from '../components';
import { ChatInput } from '../components';
import useStateRef from '../helpers/useStateRef';

function PageHome() {
  const [username, setUsername] = useState('Bob');
  const [messages, setMessages, ref] = useStateRef([]);
  const socket = useRef();

  const handleChat = (message) => {
    let msgs = ref.current;
    setMessages([...msgs, message]);
  };

  const sendMessage = (message) => {
    socket.current.emit('message', {
      author: username,
      nameColor: 'red',
      message
    });
    console.log({
      author: username,
      nameColor: 'red',
      message
    });
  };

  useEffect(() => {
    socket.current = io();
    socket.current.on('message', handleChat);
    return () => {
      socket.current.close();
    };
  }, []);

  return html`
    <div class="chatContainer">
      ${ChatArea({
        messages
      })}
      ${ChatInput({ onSend: sendMessage, onNameChange: setUsername })}
    </div>
  `;
}

const { component } = haunted({ render });
customElements.define(
  'page-home',
  component(PageHome, { useShadowDOM: false })
);
