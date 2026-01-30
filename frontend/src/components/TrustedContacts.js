import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    contactUpiId: '',
    contactName: '',
    nickname: '',
    relationship: 'other',
    notes: '',
    verificationMethod: 'none'
  });

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/trustedContacts');
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/trustedContacts', formData);
      setContacts(prev => [res.data, ...prev]);
      toast.success('Trusted contact added');
      setFormData({
        contactUpiId: '',
        contactName: '',
        nickname: '',
        relationship: 'other',
        notes: '',
        verificationMethod: 'none'
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding contact');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await axios.delete(`/api/trustedContacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      toast.success('Contact deleted');
    } catch (err) {
      toast.error('Error deleting contact');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trusted Contacts</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="contactUpiId" placeholder="UPI ID" value={formData.contactUpiId} onChange={handleChange} required />
        <input name="contactName" placeholder="Name" value={formData.contactName} onChange={handleChange} required />
        <input name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} />
        <select name="relationship" value={formData.relationship} onChange={handleChange}>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="business">Business</option>
          <option value="service">Service</option>
          <option value="other">Other</option>
        </select>
        <select name="verificationMethod" value={formData.verificationMethod} onChange={handleChange}>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="manual">Manual</option>
          <option value="none">None</option>
        </select>
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} maxLength={500} />
        <button type="submit">Add Contact</button>
      </form>

      <ul>
        {contacts.map(contact => (
          <li key={contact._id} style={{ marginBottom: '10px' }}>
            <strong>{contact.contactName}</strong> ({contact.contactUpiId}) - {contact.nickname} - {contact.relationship} 
            <button onClick={() => handleDelete(contact._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrustedContacts;
