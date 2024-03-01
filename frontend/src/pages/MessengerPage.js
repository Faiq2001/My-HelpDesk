import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MessengerPage = () => {
  const history = useHistory();
  const [pageId, setPageId] = useState('');
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [psid, setPsid] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [messageId, setMessageId] = useState('');
  const [chats, setChats] = useState([]);
  
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
        console.log(data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching page info:', error);
    }
  }

  // Once pageId and PageAccessToken is fetched, then only Fetch PSID and Conversation ID
  useEffect(() => {
    console.log(pageId);
    console.log(pageAccessToken);         
    if (pageId && pageAccessToken) {
      fetchChats();
    }
  }, [pageId, pageAccessToken]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${pageId}/conversations?fields=participants,messages{id,message}&access_token=${pageAccessToken}`);
      const data = await response.json();
      if (data && data.data && data.data.length > 0) {
        setPsid(data.data[0].participants.data[0].id);
        setConversationId(data.data[0].id);
        setMessageId(data.data[0].messages.data[0].id);
        setChats(data.data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  return (
    <div className="messenger-page-container">
      <div className="chat-list-container">
        <h2>Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessengerPage;