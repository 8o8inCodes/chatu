import React, {useEffect, useRef} from 'react';
import { ChatMessage } from '../';

const ChatArea = ({messages}) => {
    const bottomRef = useRef();

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const scrollToBottom = () => {
        if(!bottomRef.current) return;
        bottomRef.current.scrollIntoView({
            behavior: "auto",
            block: "start",
        });
    }

    return (
        <div className="chatArea">
            {messages.map(message => <ChatMessage message={message} key={message.id}/>)}
            <div ref={bottomRef} className="list-bottom"></div>
        </div>
    )
}

export default ChatArea
