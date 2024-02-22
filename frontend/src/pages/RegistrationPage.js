import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/", { name, email, password });
      if (response && response.data) {
        console.log(response.data);
        // Redirect to login page on successful registration
        window.location.href = '/login';
      } else {
        console.error('Error signing up: No data received');
        setErrorMessage('Error signing up: No data received');
      }
    } catch (error) {
      console.error('Error signing up:', error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div className="dialog-box registration-page">
      <h1>Create Account</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
        <label htmlFor="name"><b>Name</b></label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email"><b>Email</b></label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password"><b>Password</b></label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="remember"><input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember Me</label>
        
        <button type="button" className="square-button" onClick={handleSignUp}>Sign Up</button>
      </form>

      <div className="last-line"><p>Already have an account? <a href="/login">Login</a></p></div>
    </div>
  );
}

export default RegistrationPage;
