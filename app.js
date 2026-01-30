import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionContext';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Transactions from './components/Transactions';
import Settings from './components/Settings';
import FraudAlerts from './components/FraudAlerts';

// Styles
import './styles/accessibility.css';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="spinner" aria-label="Loading"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AccessibilityProvider>
          <TransactionProvider>
            <div className="app" role="application">
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
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                role="alert"
                aria-live="assertive"
              />
            </div>
          </TransactionProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;