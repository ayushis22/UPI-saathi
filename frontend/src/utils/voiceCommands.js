// src/utils/voiceCommands.js
export const parseVoiceCommand = (text) => {
  if (text.includes('send money')) {
    return { action: 'NAVIGATE', target: '/send-money' };
  }

  if (text.includes('show transactions') || text.includes('transactions')) {
    return { action: 'NAVIGATE', target: '/transactions' };
  }

  if (text.includes('show balance') || text.includes('balance')) {
    return { action: 'SHOW_BALANCE' };
  }

  if (text.includes('dashboard') || text.includes('home')) {
    return { action: 'NAVIGATE', target: '/dashboard' };
  }

  if (text.includes('confirm')) {
    return { action: 'CONFIRM_TRANSACTION' };
  }

  if (text.includes('cancel')) {
    return { action: 'CANCEL_TRANSACTION' };
  }

  return { action: 'UNKNOWN' };
};

