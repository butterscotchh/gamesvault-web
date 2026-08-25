import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { publicApi } from '../../api/axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('Username dan password wajib diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await publicApi.post('/login', {
        username: username.trim(),
        password: password.trim()
      });

      if (response.data.success) {
        const token = response.data.token;
        login(token);
        toast.success('Login berhasil!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.error || 'Username atau password salah!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f0eb' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-8 h-8" style={{ color: '#4a3a2a' }} />
            <span className="text-xl font-bold" style={{ color: '#2c2c2c' }}>
              Games<span style={{ color: '#6a5a4a' }}>Vault</span>
            </span>
          </div>
          <h1 className="text-lg font-bold" style={{ color: '#2c2c2c' }}>Admin Login</h1>
          <p className="text-xs" style={{ color: '#6a5a4a' }}>Masuk ke dashboard admin</p>
        </div>

        {/* Form */}
        <div className="p-6 border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8a7a6a' }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-9 pr-3 py-2 border text-sm focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: '#d5c8b8',
                    background: '#faf8f6',
                    color: '#2c2c2c',
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8a7a6a' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-9 pr-3 py-2 border text-sm focus:outline-none focus:ring-1"
                  style={{ 
                    borderColor: '#d5c8b8',
                    background: '#faf8f6',
                    color: '#2c2c2c',
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: '#2c2c2c',
                color: '#f5f0eb',
              }}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs hover:underline"
              style={{ color: '#6a5a4a' }}
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>

        {/* Info Credential */}
        <div className="mt-3 text-center">
          <p className="text-[10px]" style={{ color: '#8a7a6a' }}>
            THE CHOSEN ONE
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
