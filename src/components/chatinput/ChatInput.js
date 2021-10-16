import React, {useState, useEffect} from 'react'

const ChatInput = ({onSend, onNameChange}) => {
    const [value, setValue] = useState("");
    const [nameValue, setNameValue] = useState("Guest");
    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            onSend(value);
            setValue("");
        }
    }

    useEffect(() => {
        onNameChange(nameValue);
    }, [nameValue, onNameChange])
    
    return (
        <div className="chatInputContainer">
            <input
                className="nameInput" 
                type="text" 
                placeholder="Name" 
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
            />
            <input
                className="chatInput" 
                type="text" 
                placeholder="Chat message" 
                onKeyPress={handleKeyPress}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    )
}

export default ChatInput
