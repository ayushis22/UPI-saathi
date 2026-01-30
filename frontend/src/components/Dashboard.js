import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AllContexts';
import VoiceInterface from './VoiceInterface'; 
function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // const handleVoiceAction = (command) => {
  //   console.log('🎯 Action received:', command);

  //   switch (command.action) {
  //     case 'SEND_MONEY':
  //       navigate('/send-money');
  //       break;
  //     case 'GO_DASHBOARD':
  //       navigate('/dashboard');
  //       break;
  //     case 'CONFIRM_TRANSACTION':
  //       console.log('Confirm transaction action'); // replace with your logic
  //       break;
  //     case 'CANCEL_TRANSACTION':
  //       console.log('Cancel transaction action'); // replace with your logic
  //       break;
  //     default:
  //       console.log('Unknown action');
  //   }
  // };
  return (
    <div style={{ padding: '20px' }}>
      <h1>UPI-saathi</h1>
      <h2>Welcome, {user?.name}!</h2>     
      <div style={{ marginTop: '20px' }}>
        <p><strong>Balance:</strong> ₹{user?.balance}</p>
        <p><strong>UPI ID:</strong> {user?.upiId}</p>
      </div>      
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/send-money')} style={{ padding: '15px 30px' }}>
          Send Money
        </button>
        <button onClick={() => navigate('/transactions')} style={{ padding: '15px 30px' }}>
          View Transactions
        </button>
        <button onClick={() => navigate('/settings')} style={{ padding: '15px 30px' }}>
          Settings
        </button>
        <button onClick={() => navigate('/fraud-alerts')} style={{ padding: '15px 30px' }}>
          Fraud Alerts
        </button>
        <button onClick={() => navigate('/trusted-contacts')} style={{ padding: '15px 30px' }}>
          Trusted Contacts
        </button>

        <button onClick={logout} style={{ padding: '15px 30px', background: '#dc3545' }}>
          Logout
        </button>
      </div>
      {/* <div style={{ marginTop: '40px' }}>
        <VoiceInterface onAction={handleVoiceAction} />
      </div> */}
    </div>
  );
}

export default Dashboard;