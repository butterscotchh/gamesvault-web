import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './components/login/LoginPage';
import AdminPage from './pages/AdminPage';
import AdminSettings from './pages/AdminSettings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f0eb' }}>
        <span style={{ color: '#6a5a4a' }}>Loading...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/settings"
      element={
        <ProtectedRoute>
          <AdminSettings />
        </ProtectedRoute>
      }
    />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2c2c2c',
            color: '#f5f0eb',
          },
          success: {
            duration: 3000,
            style: {
              background: '#2c2c2c',
              color: '#f5f0eb',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#2c2c2c',
              color: '#f5f0eb',
            },
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
