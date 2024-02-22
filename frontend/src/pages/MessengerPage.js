import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';
import CustomerDetailsDialog from '../components/CustomerDetailsDialog';
import '../index.css'; // Import CSS styles

const MessengerPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [customerDetails, setCustomerDetails] = useState();

  useEffect(() => {
    axios.get('/api/chats')
      .then(response => {
        setChats(response.data);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedChat) {
      axios.get(`/api/chats/${selectedChat.id}/messages`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });

        // Fetch customer details when a chat is selected
        axios.get(`/api/customers/${selectedChat.customerId}`)
        .then(response => {
          setCustomerDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });
    }
  }, [selectedChat]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleMessageSubmit = (message) => {
    axios.post(`/api/chats/${selectedChat.id}/messages`, { senderId: 'yourId', recipientId: selectedChat.customerId, message })
      .then(response => {
        setMessages([...messages, response.data]);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className="messenger-page-container">
      <div className="chat-list-container">
        <ChatList chats={chats} onSelect={handleChatSelect} />
      </div>
      <div className="chat-box-container">
        <div className="chat-box">
          {selectedChat && (
            <>
              <div className="chat-header">
                <h2>{selectedChat.name}</h2>
                <div className="chat-actions">
                  <button className="call-button">Call</button>
                  <button className="profile-button">Profile</button>
                </div>
              </div>
              <div className="chat-messages">
                <ChatBox
                  messages={messages}
                  onMessageSubmit={handleMessageSubmit}
                  selectedChat={selectedChat}
                />
              </div>
              <div className="customer-details-dialog">
                <CustomerDetailsDialog
                  customerDetails = {customerDetails}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
