import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AllContexts';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Register for Accessible UPI</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          name="phoneNumber"
          placeholder="Phone (10 digits)"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '12px' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;