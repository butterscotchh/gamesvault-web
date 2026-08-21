import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Shield, Zap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { publicApi } from '../../api/axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  const handleRedeem = async (e) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      toast.error('Masukkan promo code!');
      return;
    }

    setIsLoading(true);
    try {
      const existingToken = localStorage.getItem('adminToken');
      if (existingToken) {
        try {
          const payload = JSON.parse(atob(existingToken.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            toast.success('Session masih aktif! Redirecting...');
            setTimeout(() => navigate('/admin'), 1000);
            setIsLoading(false);
            setPromoCode('');
            return;
          }
        } catch (_) {}
      }

      const response = await publicApi.post('/validate-promo', {
        code: promoCode.trim(),
      });

      if (response.data.success) {
        toast.success('Promo code valid! Redirecting...');
        localStorage.setItem('promoToken', response.data.token);
        setTimeout(() => navigate('/login'), 1000);
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

  const PromoForm = ({ className = '', inputWidth = 'w-64' }) => (
    <form onSubmit={handleRedeem} className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${inputWidth}`}>
        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-cyan opacity-70 pointer-events-none" />
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="ENTER PROMO CODE"
          className={`w-full pl-10 pr-4 py-2 bg-cyber-card border border-cyber-border rounded
            focus:outline-none focus:border-cyber-cyan focus:shadow-neon-sm
            text-sm uppercase font-mono tracking-widest transition-all
            placeholder:text-slate-500
            ${promoCode ? 'text-slate-400' : 'text-slate-500'}
          `}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-1.5 px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan hover:text-cyber-black font-mono text-sm font-bold tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-neon-sm hover:shadow-neon-cyan whitespace-nowrap"
      >
        <Zap className="w-3.5 h-3.5" />
        {isLoading ? '...' : 'REDEEM'}
      </button>
    </form>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-border">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div
            className="flex items-center gap-2 shrink-0 cursor-pointer group"
            onClick={() => { navigate('/'); setMenuOpen(false); }}
          >
            <Gamepad2 className="w-7 h-7 text-cyber-cyan drop-shadow-[0_0_6px_#00f5ff] group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold tracking-wider">
              <span className="text-neon-cyan glitch-hover">GAMER</span>
              <span className="text-slate-400 hidden sm:inline">HANDHELD</span>
            </span>
          </div>

          {/* Right side container */}
          <div className="flex items-center gap-3">
            {/* Promo form — desktop (tetap di sisi kanan) */}
            {!isAdminPage && (
              <div className="hidden md:block">
                <PromoForm inputWidth="w-64" />
              </div>
            )}

            {/* Admin actions */}
            {isAdminPage && isAuthenticated && (
              <>
                <span className="text-xs text-cyber-green font-mono tracking-widest hidden sm:inline">
                  [ ADMIN ]
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-cyber-red/50 text-cyber-red rounded hover:bg-cyber-red/10 font-mono text-xs tracking-widest transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">LOGOUT</span>
                </button>
              </>
            )}

            {/* Mobile hamburger — only on non-admin pages */}
            {!isAdminPage && (
              <button
                className="md:hidden p-1.5 border border-cyber-border text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile dropdown — Promo Form centered */}
      {!isAdminPage && menuOpen && (
        <div className="md:hidden border-t border-cyber-border bg-cyber-dark/95 px-4 py-4 flex justify-center items-center">
          <PromoForm className="w-full max-w-sm justify-center" inputWidth="flex-1" />
        </div>
      )}

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
    </nav>
  );
};

export default Navbar;