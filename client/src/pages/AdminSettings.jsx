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
  const [adminData, setAdminData] = useState(null);
  
  const [formData, setFormData] = useState({
    currentUsername: '',
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Ambil data admin dari localStorage atau context
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAdminData(payload);
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

    // Validasi
    if (!formData.currentPassword) {
      toast.error('Masukkan password lama!');
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('Password baru tidak cocok!');
      return;
    }

    // Minimal salah satu diubah
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
        
        // Kalo username berubah, update token
        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
        }
        
        // Logout setelah 2 detik (biar refresh token)
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

  // ============ LOADING SKELETON ============
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar skeleton */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-7 w-24 bg-gray-200 rounded animate-pulse ml-3" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse ml-2 hidden sm:block" />
          </div>
        </div>

        {/* Form skeleton */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2 mx-auto" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              ))}
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-bold text-brick-700 ml-3">Settings</span>
          <span className="text-sm text-gray-500 hidden sm:inline ml-2">| Manage Account</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fadeIn">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
            <p className="text-gray-500 text-sm mt-1">Ubah username atau password admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Saat Ini */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username Saat Ini
              </label>
              <input
                type="text"
                value={formData.currentUsername}
                disabled
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Username tidak bisa diubah tanpa password lama</p>
            </div>

            {/* Username Baru */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username Baru <span className="text-gray-400 text-xs">(opsional)</span>
              </label>
              <input
                type="text"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleChange}
                placeholder="Masukkan username baru"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 transition"
                disabled={isLoading}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            {/* Password Lama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password Lama <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Masukkan password lama"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 transition"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password Baru <span className="text-gray-400 text-xs">(opsional)</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Masukkan password baru"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 transition"
                disabled={isLoading}
              />
            </div>

            {/* Konfirmasi Password Baru */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi password baru"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 transition"
                disabled={isLoading}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brick-600 hover:bg-brick-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              * Anda akan logout otomatis setelah perubahan disimpan
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
