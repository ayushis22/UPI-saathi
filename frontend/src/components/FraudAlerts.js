import React from 'react';
import { useNavigate } from 'react-router-dom';

function FraudAlerts() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Fraud Alerts & Security</h2>
      
      <div style={{ marginTop: '20px', background: '#d4edda', padding: '15px', borderRadius: '5px' }}>
        <h3 style={{ color: '#155724' }}>✅ No Active Alerts</h3>
        <p>Your account security looks good!</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Security Tips</h3>
        <ul style={{ marginTop: '15px', lineHeight: '2' }}>
          <li>Never share your UPI PIN with anyone</li>
          <li>Verify recipient details before sending money</li>
          <li>Enable biometric authentication</li>
          <li>Review transactions regularly</li>
        </ul>
      </div>

      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ marginTop: '30px', padding: '15px 30px' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default FraudAlerts;