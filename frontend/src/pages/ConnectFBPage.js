import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fbIcon from '../fb-icon.png';

const ConnectFBPage = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '788371886528778', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0' // Use the version of the Graph API you want to use
      });

      // Check if the user is already logged in
      window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          setIsLoggedIn(true);
          // Fetch user's name
          fetchUserData();
        }
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const fetchUserData = () => {
    window.FB.api('/me', 'GET', { fields: 'name,picture' }, function (response) {
      console.log(response);
      setUserName(response.name);
      setUserAccessToken(window.FB.getAuthResponse().accessToken);
    });
  };

  const handleConnect = () => {
    // Initiate Facebook login process
    if (window.FB) {
      window.FB.login(response => {
        if (response.authResponse) {
          console.log('User logged in successfully:', response);
          setIsLoggedIn(true);
          // Fetch user's name
          fetchUserData();
          // Redirect to delete-integration page
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    }
  };

  const handleContinue = () =>{
    history.push({
      pathname: '/delete-integration',
      state: { userAccessToken } // Pass userAccessToken as state to DeleteIntegrationPage.js
    });
  }

  return (
    <div className="dialog-box connect-fb-page">
      <h1>Facebook Page Integration</h1>
      
      {isLoggedIn ? (
        <button type="button" className="profile-button" onClick={handleContinue}>
          Continue as {userName}
        </button>
      ) : (
        <button type="button" className="square-button" onClick={handleConnect}>
          <img src={fbIcon} alt="Facebook Icon" />Login to Facebook
        </button>
      )}
      
    </div>
  );
};

export default ConnectFBPage;
