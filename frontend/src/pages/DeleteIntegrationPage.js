import React from 'react';
import { useHistory } from 'react-router-dom';

const DeleteIntegrationPage = () => {
  const history = useHistory();

  const handleDeleteIntegration = () => {
    // Handle delete integration logic here
    console.log('Deleting integration...');
  };

  const handleReplyToMessages = () => {
    // Handle reply to messages logic here
    history.push({
      pathname: '/messenger',
      state: { userAccessToken: history.location.state.userAccessToken } // Pass the user access token to Messenger.js
    });
    console.log('Replying to messages...');
  };

  return (
    <div className="dialog-box delete-integration-page">
      <h3><b>Facebook Page Integration</b></h3>
      <h3>Integrated Page: <b>Amazon Business</b></h3>

      <button type="button" className="square-button delete-button" onClick={handleDeleteIntegration}>Delete Integration</button>
      <button type="button" className="square-button" onClick={handleReplyToMessages}>Reply to Messages</button>
    </div>
  );
}

export default DeleteIntegrationPage;
