import React from 'react';
import { useHistory } from 'react-router-dom';

const ConnectFBPage = () => {
  const history = useHistory();

  const handleConnect = () => {
    // Handle connect to FB logic here
    console.log('Connecting to Facebook...');
    history.push('/create-connect')
  };

  return (
    <div className="dialog-box connect-fb-page">
      <h1>Facebook Page Integration</h1>
      <button type="button" className="square-button" onClick={handleConnect}>Connect Page</button>
    </div>
  );
}

export default ConnectFBPage;