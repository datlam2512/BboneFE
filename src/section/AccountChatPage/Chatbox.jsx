import React, { useState } from 'react';
import '../AccountChatPage/views/ChatApp.css';

function Chatbox({ customer }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;
        
        const newMessage = { sender: "staff", text: inputValue, timestamp: new Date().toLocaleTimeString() };
        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="chatbox">
            <h3>Chat với {customer.name}</h3>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <span className="text">{message.text}</span>
                        <span className="timestamp">{message.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default Chatbox;
