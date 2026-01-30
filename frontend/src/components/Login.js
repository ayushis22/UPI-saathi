import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AllContexts';
import { useAccessibility } from '../contexts/AllContexts';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { speak, settings } = useAccessibility();
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (settings.voiceEnabled) {
      speak('Login page loaded. Please enter your email and password.');
    }
  }, []); // 🔴 Runs only once on page load
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await login(email, password);
  //   if (success) navigate('/dashboard');
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  setStatusMessage('Logging in. Please wait');
  if (settings.voiceEnabled) {
    speak('Logging in. Please wait');
  }

  const success = await login(email, password);

  if (success) {
    setStatusMessage('Login successful. Welcome to UPI Saathi. Redirecting to dashboard');
    if (settings.voiceEnabled) {
      speak('Login successful. Welcome to UPI Saathi. Redirecting to dashboard');
    }

    // ⏳ Let speech finish before navigation
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  } else {
    setStatusMessage('Login failed. Please check your credentials');
    if (settings.voiceEnabled) {
      speak('Login failed. Please check your credentials');
    }
  }
};


  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h1>UPI-saathi Login</h1>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        {statusMessage}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button aria-label="Login to your UPI Saathi account" type="submit" style={{ width: '100%', padding: '12px' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;