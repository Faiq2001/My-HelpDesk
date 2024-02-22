import React from 'react';

const ChatList = ({ chats, onSelect }) => {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div key={chat.id} className="chat-item" onClick={() => onSelect(chat)}>
          <h3>{chat.name}</h3>
          <p>{chat.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
