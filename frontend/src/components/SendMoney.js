import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../contexts/AllContexts';
import { notifyError, notifySuccess } from '../utils/notification';


function SendMoney() {
  const [formData, setFormData] = useState({
    recipientUpiId: '',
    amount: '',
    description: ''
  });
  const [confirming, setConfirming] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const { sendMoney, confirmTransaction, cancelTransaction } = useTransaction();
  const navigate = useNavigate();
 
  const speakEnabled = true;
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // try {
  //   const result = await sendMoney(formData);

  //   notifySuccess({
  //     message: result.message || 'Transaction initiated',
  //     speakEnabled,
  //     speak
  //   });

  //   setTransaction(result.data);
  //   setConfirming(true);
  // } catch (error) {
  //   notifyError({
  //     message:
  //       error?.response?.data?.message ||
  //       'Unable to send money. Please try again.',
  //     speakEnabled,
  //     speak
  //   });
  // }
   try {
    const result = await sendMoney(formData);

    if (result.flagged || !result.success) {
      // ❌ flagged or failed transactions → notifyError
      notifyError({
        message: result.message || 'Transaction could not be processed',
        speakEnabled: true, // make sure this is true
        speak
      });
    } else {
      // ✅ successful transaction
      notifySuccess({
        message: result.message || 'Transaction initiated',
        speakEnabled: true,
        speak
      });
    }

    setTransaction(result.data);
    setConfirming(true);

  } catch (error) {
    // unexpected errors (network, server down)
    notifyError({
      message: error?.response?.data?.message || 'Unable to send money. Please try again.',
      speakEnabled: true,
      speak
    });
  }

};


  const handleConfirm = async () => {
    await confirmTransaction(transaction._id, {
      voiceConfirmed: true,
      visualConfirmed: true
    });
    navigate('/dashboard');
  };

  const handleCancel = async () => {
    await cancelTransaction(transaction._id, 'User cancelled');
    navigate('/dashboard');
  };

  if (confirming && transaction) {
    return (
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2>Confirm Transaction</h2>
        <div style={{ background: '#f8f9fa', padding: '20px', marginTop: '20px' }}>
          <p><strong>To:</strong> {transaction.recipient.upiId}</p>
          <p><strong>Amount:</strong> ₹{transaction.amount}</p>
          <p><strong>Description:</strong> {transaction.description || 'None'}</p>
          {transaction.fraudAnalysis?.flagged && (
            <p style={{ color: '#dc3545', marginTop: '10px' }}>
              ⚠️ This transaction has been flagged for security review
            </p>
          )}
        </div>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={handleConfirm} style={{ flex: 1, padding: '15px', background: '#28a745' }}>
            Confirm
          </button>
          <button onClick={handleCancel} style={{ flex: 1, padding: '15px', background: '#dc3545' }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="recipientUpiId">Recipient UPI ID</label>
          <input
            id="recipientUpiId"
            name="recipientUpiId"
            placeholder="example@upi"
            value={formData.recipientUpiId}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="1000"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description (Optional)</label>
          <input
            id="description"
            name="description"
            placeholder="Payment for..."
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '15px' }}>
          Continue
        </button>
      </form>
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ width: '100%', padding: '15px', marginTop: '10px', background: '#6c757d' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default SendMoney;