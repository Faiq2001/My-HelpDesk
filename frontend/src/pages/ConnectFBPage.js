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
      }, {scope: 'public_profile,email'});
    }
  };

  return (
    <div className="dialog-box connect-fb-page">
      <h1>Facebook Page Integration</h1>
      {/* Facebook login button */}
      <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0&appId=788371886528778" nonce="7h2RD9gP"></script>
      <div className="fb-login-button" data-width="97%" data-size="" data-button-type="" data-layout="" data-auto-logout-link="true" data-use-continue-as="true" onClick={handleConnect}></div>
    </div>
  );
};

export default ConnectFBPage;
