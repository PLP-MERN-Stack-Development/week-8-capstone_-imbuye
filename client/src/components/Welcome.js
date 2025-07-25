import React, { useState } from 'react';
import './Welcome.css';
import axios from 'axios';

const Welcome = ({ onStart, onLoginSuccess }) => {
  const [tab, setTab] = useState('login'); // 'login' or 'register'

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register states
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (res.data.message === 'Login successful') {
        localStorage.setItem('userEmail', loginEmail);
        onLoginSuccess?.(); // Notify parent to redirect or load the dashboard
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (regPassword !== regConfirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email: regEmail,
        password: regPassword,
      });

      if (res.data.message === 'Registration successful') {
        setSuccess('Registration successful! You can now log in.');
        setTab('login');
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  const handleContinueWithoutLogin = () => {
    localStorage.setItem('guest', 'true'); // optional: identify guest mode
    onStart?.(); // Starts the app without login
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Cost Splitter 💸</h1>

      <div className="tab-buttons">
        <button
          className={tab === 'login' ? 'active' : ''}
          onClick={() => setTab('login')}
        >
          Login
        </button>
        <button
          className={tab === 'register' ? 'active' : ''}
          onClick={() => setTab('register')}
        >
          Register
        </button>
      </div>

      {tab === 'login' && (
        <form className="auth-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      )}

      {tab === 'register' && (
        <form className="auth-form" onSubmit={handleRegister}>
          <label>Email</label>
          <input
            type="email"
            required
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={regConfirm}
            onChange={(e) => setRegConfirm(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <button className="continue-button" onClick={handleContinueWithoutLogin}>
        Continue Without Login
      </button>
    </div>
  );
};

export default Welcome;
