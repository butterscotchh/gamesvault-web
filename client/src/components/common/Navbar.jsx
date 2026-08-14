import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

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
      // DUMMY VALIDATION - NANTI DIGANTI PAKAI API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (promoCode.trim() === 'GAMER2026') {
        toast.success('Promo code valid! Redirecting...');
        localStorage.setItem('promoToken', 'dummy_promo_token');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast.error('Kode promo tidak valid!');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan, coba lagi!');
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Gamepad2 className="w-8 h-8 text-brick-600" />
            <span className="text-xl font-bold text-brick-700">
              Gamer<span className="text-gray-600">Handheld</span>
            </span>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleRedeem} className="flex items-center gap-2 flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="PROMO CODE"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brick-500 focus:border-transparent text-sm uppercase"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-brick-600 text-white rounded-lg hover:bg-brick-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium whitespace-nowrap"
            >
              {isLoading ? '...' : 'REDEEM'}
            </button>
          </form>

          {/* Right Side - Logout (kalo admin login) */}
          <div className="flex items-center gap-3 shrink-0">
            {isAuthenticated && (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">Admin</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
