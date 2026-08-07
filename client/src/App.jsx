import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './components/login/LoginPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
