import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, LogOut, Menu, X, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { publicApi } from '../../api/axios';
import toast from 'react-hot-toast';

const PromoForm = ({ promoCode, setPromoCode, onSubmit, isLoading, className = '', inputWidth = 'w-52' }) => (
  <form onSubmit={onSubmit} className={`flex items-center gap-2 ${className}`}>
    <div className={`relative ${inputWidth}`}>
      <Star className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#c9a8f5' }} />
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
        placeholder="ENTER CODE..."
        style={{
          fontFamily: '"Orbitron", sans-serif',
          background: '#f0eaff',
          border: '2px solid #b89ee8',
          color: promoCode ? '#4a3570' : '#b89ee8',
          boxShadow: 'inset 2px 2px 4px rgba(184,158,232,0.3)',
        }}
        className="w-full pl-8 pr-3 py-1.5 text-xs uppercase tracking-widest transition-all focus:outline-none placeholder:text-y2k-border"
        disabled={isLoading}
      />
    </div>
    <button type="submit" disabled={isLoading} className="btn-y2k px-3 py-1.5 text-[8px] disabled:opacity-50">
      {isLoading ? '...' : 'REDEEM'}
    </button>
  </form>
);

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
    if (!promoCode.trim()) { toast.error('Masukkan promo code!'); return; }
    setIsLoading(true);
    try {
      const existingToken = localStorage.getItem('adminToken');
      if (existingToken) {
        try {
          const payload = JSON.parse(atob(existingToken.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            toast.success('Session masih aktif! Redirecting...');
            setTimeout(() => navigate('/admin'), 1000);
            setIsLoading(false); setPromoCode(''); return;
          }
        } catch (_) {}
      }
      const response = await publicApi.post('/validate-promo', { code: promoCode.trim() });
      if (response.data.success) {
        toast.success('Promo code valid! Redirecting...');
        localStorage.setItem('promoToken', response.data.token);
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Kode promo tidak valid!');
    } finally {
      setIsLoading(false); setPromoCode('');
    }
  };

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out!'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top pastel rainbow stripe */}
      <div className="h-1.5 w-full" style={{
        background: 'linear-gradient(90deg, #f5a8d0, #c9a8f5, #a8d8f5, #a8e8c8, #f5e8a8, #f5c8a8, #f0b8c8, #f5a8d0)',
        backgroundSize: '200% auto',
        animation: 'rainbowShift 3s linear infinite',
      }} />

      {/* Main bar */}
      <div className="border-b-2" style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0eaff 100%)',
        borderColor: '#b89ee8',
        boxShadow: '0 2px 0 rgba(255,255,255,0.8), 0 4px 12px rgba(184,158,232,0.2)',
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Logo */}
            <div
              className="flex items-center gap-2 shrink-0 cursor-pointer group"
              onClick={() => { navigate('/'); setMenuOpen(false); }}
            >
              <Gamepad2 className="w-7 h-7 animate-float" style={{ color: '#c9a8f5', filter: 'drop-shadow(0 0 6px #c9a8f5)' }} />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black tracking-widest text-rainbow" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                  GAMER
                </span>
                <span className="text-[8px] tracking-[0.3em] hidden sm:block" style={{ fontFamily: '"Orbitron", sans-serif', color: '#5a3d8a' }}>
                  HANDHELD
                </span>
              </div>
            </div>

            {/* Promo form — desktop */}
            {!isAdminPage && (
              <div className="hidden md:block">
                <PromoForm promoCode={promoCode} setPromoCode={setPromoCode} onSubmit={handleRedeem} isLoading={isLoading} inputWidth="w-52" />
              </div>
            )}

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {isAdminPage && isAuthenticated && (
                <>
                  <span className="text-[8px] px-2 py-1 border hidden sm:inline" style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: '#a8e8c8',
                    borderColor: '#a8e8c8',
                    background: '#a8e8c820',
                    textShadow: '0 0 6px #a8e8c8',
                  }}>
                    ★ ADMIN ★
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1.5 border-2 text-[8px] transition-all hover:opacity-80"
                    style={{ fontFamily: '"Press Start 2P", monospace', borderColor: '#f5a8d0', color: '#c9a8f5', background: '#f5a8d010' }}
                  >
                    <LogOut className="w-3 h-3" />
                    <span className="hidden sm:inline">EXIT</span>
                  </button>
                </>
              )}
              {!isAdminPage && (
                <button
                  className="md:hidden p-1.5 border-2 transition-all"
                  style={{ borderColor: '#c9a8f5', color: '#c9a8f5' }}
                  onClick={() => setMenuOpen(p => !p)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile promo dropdown */}
      {!isAdminPage && menuOpen && (
        <div className="md:hidden border-b-2 px-4 py-3 flex justify-center" style={{
          background: '#f0eaff',
          borderColor: '#b89ee8',
        }}>
          <PromoForm promoCode={promoCode} setPromoCode={setPromoCode} onSubmit={handleRedeem} isLoading={isLoading} className="w-full max-w-sm" inputWidth="flex-1" />
        </div>
      )}

      {/* Ticker */}
      {!isAdminPage && (
        <div className="h-6 flex items-center overflow-hidden border-b" style={{ background: '#ede5ff', borderColor: '#c9a8f5' }}>
          <div className="ticker-wrap flex-1">
            <span className="ticker-inner text-[10px] px-8" style={{
              fontFamily: '"VT323", monospace',
              letterSpacing: '0.15em',
              color: '#4a3070',
            }}>
              ★ WELCOME TO GAMER HANDHELD SHOWROOM ★&nbsp;&nbsp;&nbsp;
              ✦ PSP · DS LITE · PS VITA · 3DS · 2DS ✦&nbsp;&nbsp;&nbsp;
              ★ ENTER PROMO CODE TO ACCESS ADMIN ★&nbsp;&nbsp;&nbsp;
              ✦ BEST HANDHELD COLLECTION 2000–2025 ✦&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
