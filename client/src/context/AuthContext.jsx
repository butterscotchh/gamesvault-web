import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── CEK TOKEN VALID ───
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      // Cek apakah token sudah expired
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // ─── CEK TOKEN SAAT LOAD ───
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      // Token ga valid / expired → hapus
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // ─── LOGIN ───
  const login = (token) => {
    if (isTokenValid(token)) {
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
    } else {
      console.error('❌ Invalid token');
    }
  };

  // ─── LOGOUT ───
  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};