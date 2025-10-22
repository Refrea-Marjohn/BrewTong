import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return new Promise((resolve, reject) => {
      // Mock signup - always succeeds for demo but doesn't auto-login
      setTimeout(() => {
        // Just save the account info without logging in
        const accountData = {
          email: email,
          password: password, // In real app, this would be hashed
          createdAt: new Date().toISOString()
        };
        
        // Save account to localStorage
        const existingAccounts = JSON.parse(localStorage.getItem('brewtong-accounts') || '[]');
        existingAccounts.push(accountData);
        localStorage.setItem('brewtong-accounts', JSON.stringify(existingAccounts));
        
        resolve({ user: null }); // Don't set currentUser
      }, 1000);
    });
  }

  function login(email, password) {
    return new Promise((resolve, reject) => {
      // Check if account exists
      const existingAccounts = JSON.parse(localStorage.getItem('brewtong-accounts') || '[]');
      const account = existingAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (!account) {
        reject(new Error('Invalid email or password'));
        return;
      }
      
      setTimeout(() => {
        const user = {
          uid: 'demo-user-' + Date.now(),
          email: email,
          displayName: email.split('@')[0]
        };
        localStorage.setItem('brewtong-user', JSON.stringify(user));
        setCurrentUser(user);
        resolve({ user });
      }, 1000);
    });
  }

  function logout() {
    return new Promise((resolve) => {
      localStorage.removeItem('brewtong-user');
      setCurrentUser(null);
      resolve();
    });
  }

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('brewtong-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}