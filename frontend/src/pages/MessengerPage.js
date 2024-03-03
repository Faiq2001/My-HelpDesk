import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MessengerPage = () => {
  const history = useHistory();
  const [pageId, setPageId] = useState('');
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMap, setChatMap] = useState({});
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // if (!history.location.state || !history.location.state.userAccessToken) {
    if(!window.FB){
      history.push('/connect-fb-page');
    } else {
      // Fetch Page ID and Page Access Token
      fetchPageInfo();
    }
  }, []);

  const fetchPageInfo = async () => {
    try {
      const userAccessToken = history.location.state.userAccessToken;
      console.log(userAccessToken);
      const response = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`);
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setPageId(data.data[0].id);
        setPageAccessToken(data.data[0].access_token);
      }
    } catch (error) {
      console.error('Error fetching page info:', error);
    }
  }

  // Once pageId and PageAccessToken is fetched, then only Fetch PSID and Conversation ID
  useEffect(() => {
    if (pageId && pageAccessToken) {
      fetchChats();
    }
  }, [pageId, pageAccessToken]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${pageId}/conversations?fields=participants,messages{id,message}&access_token=${pageAccessToken}`);
      const responseData = await response.json();
      if (responseData && responseData.data && responseData.data.length > 0) {
        setChats(responseData.data);

        const chatMapObj = {};
        responseData.data.forEach(chat => {
            const id = chat.participants.data[0].id;
            const name = chat.participants.data[0].name;
            const messages = chat.messages.data;
            if(!selectedChatId)     selectChat(id);
            chatMapObj[id] = { name, messages };
            console.log(chat);
            console.log(id);
        });
        setChatMap(chatMapObj);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const selectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

//   useEffect(() => {
//     console.log(chats);
//   }, [chats]);

  const sendMessage = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${pageId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: { id: selectedChatId },
          message: { text: messageText },
          messaging_type: 'RESPONSE',
          access_token: pageAccessToken
        })
      });
      const responseData = await response.json();
      console.log(responseData);
      // Clear the message text box after sending
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="messenger-page-container">
      <div className="chat-list-container">
        <h2>Chats</h2>
        <ul>
            {Object.entries(chatMap).map(([id, chat]) => (
                <li key={id} onClick={() => selectChat(id)}>
                {chat.name}
                </li>
            ))}
        </ul>
      </div>
      <div className="selected-chat-container">
        <h2>Selected Chat</h2>
        {selectedChatId && (
          <div>
            <h3>{chatMap[selectedChatId].name}</h3>
            <ul>
              {chatMap[selectedChatId].messages.map((message) => (
                <li key={message.id}>{message.message}</li>
              )).reverse()} {/* Display messages in descending order */}
            </ul>
            <div>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerPage;