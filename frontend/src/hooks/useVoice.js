// src/hooks/useVoice.js
import { useEffect, useRef, useState } from 'react';

export const useVoice = ({ onCommand }) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('🎤 Heard:', transcript);
      onCommand?.(transcript);
    };

    recognition.onerror = (e) => {
      console.error('Voice error:', e);
      setError(e.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [onCommand]);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return {
    listening,
    startListening,
    stopListening,
    error
  };
};
