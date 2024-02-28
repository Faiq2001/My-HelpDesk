import React from 'react';
import { useHistory } from 'react-router-dom';

const ConnectFBPage = () => {
  const history = useHistory();

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
    };
  };

  return (
    <div className="dialog-box connect-fb-page">
      <h1>Facebook Page Integration</h1>
      <button type="button" className="square-button" onClick={handleConnect}>Connect Page</button>
    </div>
  );
};

export default ConnectFBPage;
