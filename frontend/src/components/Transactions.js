import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../contexts/AllContexts';

function Transactions() {
  const { transactions, fetchTransactions } = useTransaction();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No transactions yet</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {transactions.map((txn) => (
            <div 
              key={txn._id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                marginBottom: '10px',
                borderRadius: '5px'
              }}
            >
              <p><strong>ID:</strong> {txn.transactionId}</p>
              <p><strong>To:</strong> {txn.recipient.upiId}</p>
              <p><strong>Amount:</strong> ₹{txn.amount}</p>
              <p><strong>Status:</strong> <span style={{ 
                color: txn.status === 'completed' ? '#28a745' : '#dc3545' 
              }}>{txn.status}</span></p>
              <p><strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ marginTop: '20px', padding: '15px 30px' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Transactions;