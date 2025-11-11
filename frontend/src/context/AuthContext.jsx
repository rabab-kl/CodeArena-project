import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charge le token depuis localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      // TODO : Remplacer par axios POST /auth/login de Sébastien
      console.log('Login with:', email, password);
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: 1, email, name: 'Sophie' },
      };
      
      setToken(mockResponse.token);
      setUser(mockResponse.user);
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (email, password, name) => {
    try {
      // TODO : Remplacer par axios POST /auth/register de Sébastien
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: 1, email, name },
      };
      
      setToken(mockResponse.token);
      setUser(mockResponse.user);
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};