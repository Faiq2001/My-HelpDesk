import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ConnectFBPage = () => {
  const history = useHistory();

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '788371886528778', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v19.0' // Use the version of the Graph API you want to use
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

  const handleConnect = () => {
    // Initiate Facebook login process
    if (window.FB) {
      window.FB.login(response => {
        if (response.authResponse) {
          console.log('User logged in successfully:', response);
          // Redirect to delete-integration page
          history.push('/delete-integration');
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
  };

  return (
    <div className="dialog-box connect-fb-page">
      <h1>Facebook Page Integration</h1>
      <button type="button" className="square-button" onClick={handleConnect}>Connect Page</button>
    </div>
  );
};

export default ConnectFBPage;