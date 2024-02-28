import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // const response = await axios.post('http://localhost:4000/login', { email, password });
      const response = await axios.post('https://myhelpdesk.onrender.com/login', { email, password });
      console.log(response.data);
      // Redirect to ConnectFBPage on successful login
      window.location.href = '/connect-fb-page';
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="dialog-box login-page">
      <h1>Login to your account</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
        <label htmlFor="email"><b>Email</b></label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password"><b>Password</b></label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="remember"><input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember Me</label>
        
        <button type="button" className="square-button" onClick={handleLogin}>Login</button>
      </form>

      <div className="last-line">
        <p>New to MyApp? <a href="/">Sign Up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;

