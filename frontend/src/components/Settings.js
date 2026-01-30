import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../contexts/AllContexts';

function Settings() {
  const { settings, toggleHighContrast, toggleVoice, setFontSize } = useAccessibility();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Accessibility Settings</h2>
      
      <div style={{ marginTop: '30px' }}>
        <h3>Visual Settings</h3>
        <div style={{ marginTop: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={toggleHighContrast}
              style={{ marginRight: '10px' }}
            />
            High Contrast Mode
          </label>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <label>Font Size:</label>
          <select 
            value={settings.fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Voice Settings</h3>
        <label>
          <input
            type="checkbox"
            checked={settings.voiceEnabled}
            onChange={toggleVoice}
            style={{ marginRight: '10px' }}
          />
          Enable Voice Navigation
        </label>
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

export default Settings;