import React from 'react'

const ChatMessage = ({message}) => {
    return (
        <div className="messageContainer">
            <p>
                <label style={{color: message.nameColor}}>{message.author} </label>:
                <label>{" "}{message.message}</label>
            </p>
        </div>
    )
}

export default ChatMessage
