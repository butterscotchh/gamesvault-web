import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    currentUsername: '',
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Ambil data admin dari localStorage
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setFormData(prev => ({
          ...prev,
          currentUsername: payload.username || ''
        }));
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      toast.error('Masukkan password lama!');
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('Password baru tidak cocok!');
      return;
    }

    if (!formData.newUsername && !formData.newPassword) {
      toast.error('Isi minimal satu field (username atau password)!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put('/admin/settings', {
        currentUsername: formData.currentUsername,
        newUsername: formData.newUsername || undefined,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword || undefined
      });

      if (response.data.success) {
        toast.success('Settings updated!');
        
        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
        }
        
        setTimeout(() => {
          logout();
          navigate('/login');
          toast('Silakan login ulang!');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error(error.response?.data?.error || 'Gagal update settings!');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f0eb' }}>
        <div style={{ color: '#6a5a4a' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f0eb' }}>
      {/* Navbar */}
      <nav className="border-b px-4 py-2" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
        <div className="max-w-2xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/admin')}
            className="p-1 transition-colors"
            style={{ color: '#4a3a2a' }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold ml-2" style={{ color: '#2c2c2c' }}>Settings</span>
          <span className="text-xs ml-2" style={{ color: '#8a7a6a' }}>| Manage Account</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="p-6 border" style={{ background: '#ffffff', borderColor: '#d5c8b8' }}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold" style={{ color: '#2c2c2c' }}>Account Settings</h1>
            <p className="text-xs" style={{ color: '#6a5a4a' }}>Ubah username atau password admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Saat Ini */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Username Saat Ini
              </label>
              <input
                type="text"
                value={formData.currentUsername}
                disabled
                className="w-full px-3 py-1.5 border text-sm"
                style={{ borderColor: '#d5c8b8', background: '#f5f0eb', color: '#8a7a6a' }}
              />
            </div>

            {/* Username Baru */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Username Baru <span style={{ color: '#8a7a6a', fontSize: '10px' }}>(opsional)</span>
              </label>
              <input
                type="text"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleChange}
                placeholder="Masukkan username baru"
                className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                disabled={isLoading}
              />
            </div>

            <div className="border-t" style={{ borderColor: '#ece3d8' }} />

            {/* Password Lama */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Password Lama <span style={{ color: '#cc0000' }}>*</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Masukkan password lama"
                className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Password Baru <span style={{ color: '#8a7a6a', fontSize: '10px' }}>(opsional)</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Masukkan password baru"
                className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                disabled={isLoading}
              />
            </div>

            {/* Konfirmasi Password Baru */}
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#4a3a2a' }}>
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi password baru"
                className="w-full px-3 py-1.5 border text-sm focus:outline-none focus:ring-1"
                style={{ borderColor: '#d5c8b8', background: '#faf8f6', color: '#2c2c2c' }}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#2c2c2c', color: '#f5f0eb' }}
            >
              {isLoading ? 'Updating...' : 'Save Changes'}
            </button>

            <p className="text-[10px] text-center" style={{ color: '#8a7a6a' }}>
              * Anda akan logout otomatis setelah perubahan disimpan
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
