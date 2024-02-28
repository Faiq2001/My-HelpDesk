//handle the Facebook login flow and permissions.
//Use Facebook SDK or OAuth flow to authenticate users and request necessary permissions.
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import FacebookLogin from '@greatsumini/react-facebook-login';

import '../index.css';

const CreateConnectionPage = () => {
  const history = useHistory(); // Initialize useHistory hook

  // Function to handle successful login
  const handleFacebookLogin = (response) => {
    console.log(response);

    // Send the access token to the backend
    // axios.post('http://localhost:4000/webhook', { accessToken: response.accessToken })
    axios.post('https://myhelpdesk.onrender.com/webhook', { accessToken: response.accessToken })
      .then((res) => {
        console.log('Access token sent to backend:', res.data);

        // Redirect to MessengerPage on successful login
        history.push('/messenger');
      })
      .catch((error) => {
        console.error('Error sending access token to backend:', error);

        // Redirect to ConnectFBPage on login failure
        history.push('/connect-fb-page');
      });
  };

  // Function to handle login failure
  const handleLoginFailure = (error) => {
    
    console.error('Facebook login failed:', error);
    // You can display an error message to the user
    alert('Facebook login failed. Please try again.');
  
    // Redirect to ConnectFBPage on login failure
    history.push('/connect-fb-page');
  };

  return (
    <div>
      <h1>Create Connection Page</h1>
      <FacebookLogin
        appId="788371886528778" // Replace with your Facebook App ID
        autoLoad={false}
        fields="name,email"
        scope="manage_pages,pages_show_list,pages_manage_comments,pages_messaging" // Add additional permissions as needed
        callback={handleFacebookLogin}
        onFailure={handleLoginFailure}
      />
    </div>
  );
};

export default CreateConnectionPage;
