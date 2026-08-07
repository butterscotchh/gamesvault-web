import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleRedeem = async (e) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      toast.error('Masukkan promo code!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/validate-promo', { 
        code: promoCode.trim() 
      });
      
      if (response.data.success) {
        toast.success('Promo code valid! Redirecting...');
        // Simpan token dan redirect ke login
        localStorage.setItem('promoToken', response.data.token);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Kode promo tidak valid!');
    } finally {
      setIsLoading(false);
      setPromoCode('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-brick-600" />
            <span className="text-xl font-bold text-brick-700">
              Gamer<span className="text-gray-600">Handheld</span>
            </span>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleRedeem} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="PROMO CODE"
                className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 focus:border-transparent text-sm uppercase"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-brick-600 text-white rounded-lg hover:bg-brick-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isLoading ? '...' : 'REDEEM'}
            </button>
          </form>

          {/* Right Side - Admin/Login */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">Admin</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm text-gray-600 hover:text-brick-600 font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Promo Code Form */}
        <form onSubmit={handleRedeem} className="md:hidden pb-3 flex items-center gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="PROMO CODE"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 text-sm uppercase"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-brick-600 text-white rounded-lg hover:bg-brick-700 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isLoading ? '...' : 'REDEEM'}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
