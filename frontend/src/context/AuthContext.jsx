import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  const login = (data) => {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify({
      id: data.id,
      email: data.email,
      role: data.role
    }));
    setToken(data.token);
    setUser({ id: data.id, email: data.email, role: data.role });
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
