import React, { useState } from 'react';

const ChatBox = ({ messages, onMessageSubmit, selectedChat }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(message);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === 'yourId' ? 'sent' : 'received'}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${selectedChat.firstName} ${selectedChat.lastName}`}
        />
      </form>
    </div>
  );
};

export default ChatBox;
