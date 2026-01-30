import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { useAccessibility, useAuth } from './contexts/AllContexts';
import VoiceInterface from './components/VoiceInterface';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import FraudAlerts from './components/FraudAlerts';
import TrustedContacts from './components/TrustedContacts';
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

const AppRoutes = () => {
  const navigate = useNavigate(); // ✅ NOW SAFE
  const { speak, settings } = useAccessibility();
  const { user } = useAuth();

  return (
    <>
      {/* 🎤 GLOBAL VOICE LISTENER */}
      {settings.voiceEnabled && (
        <VoiceInterface
          onAction={(command) => {
            console.log('🎯 Voice Action:', command);

            if (command.action === 'NAVIGATE') {
              speak('Navigating');
              navigate(command.target);
            }

            if (command.action === 'SHOW_BALANCE') {
              if (user?.balance != null) {
                speak(`Your current balance is Rupees ${user.balance}`);
              }
            }
          }}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/send-money"
          element={
            <PrivateRoute>
              <SendMoney />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="/fraud-alerts"
          element={
            <PrivateRoute>
              <FraudAlerts />
            </PrivateRoute>
          }
        />
        <Route path="/trusted-contacts" element={<TrustedContacts />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
