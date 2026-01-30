// src/components/VoiceInterface.js
import React from 'react';
import { useVoice } from '../hooks/useVoice';
import { parseVoiceCommand } from '../utils/voiceCommands';
import { toast } from 'react-toastify';

const VoiceInterface = ({ onAction }) => {
  const { listening, startListening, stopListening, error } = useVoice({
    onCommand: (text) => {
      const command = parseVoiceCommand(text);
      console.log('🧠 Command:', command);

      if (command.action === 'UNKNOWN') {
        toast.info('Sorry, I did not understand that.');
        return;
      }

      onAction?.(command);
    }
  });

  return (
    <div>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? '🛑 Stop Voice' : '🎤 Start Voice'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VoiceInterface;
