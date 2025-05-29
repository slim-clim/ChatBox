
import React, { useState, useEffect } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:8090');

function ChatApp() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      setChatLog((prevChatLog) => [...prevChatLog, { message: event.data, sent: false }]);
    };
  }, []);

  const handleSendMessage = () => {
    socket.send(message);
    setChatLog((prevChatLog) => [...prevChatLog, { message, sent: true }]);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <div key={index} className={`message ${message.sent ? 'sent' : 'received'}`}>
              {message.message}
            </div>
          ))}
        </div>
        <div className="message-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;