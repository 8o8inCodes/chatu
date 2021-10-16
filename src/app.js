import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import { ChatArea, ChatInput } from './components';
import useStateRef from './utils/useStateRef';

function App() {
  const [username, setUsername] = useState("Bob");
  const [messages, setMessages, ref] = useStateRef([]);
  const socket = useRef()

  const handleChat = message => {
    let msgs = ref.current
    setMessages([...msgs,
        message
    ]);
  };

  const sendMessage = message => {
    socket.current.emit('message', {
      author: username,
      nameColor: "red",
      message
    });
  }

  useEffect(() => {
    socket.current = io();
    socket.current.on('message', handleChat)
    return () => {
      socket.current.close();
    }
  }, [])

  return (
    <div className="chatContainer">
      <ChatArea messages={messages} />
      <ChatInput onSend={sendMessage} onNameChange={newName => setUsername(newName)}/>
    </div>
  );
}

export default App;
