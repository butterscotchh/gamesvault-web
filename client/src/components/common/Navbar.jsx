import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { publicApi } from '../../api/axios';
import toast from 'react-hot-toast';

const SigilIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: '#8a7a60' }}>
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="0.8" />
    <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="0.8" />
    <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="0.8" />
    <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" stroke="currentColor" strokeWidth="0.5" />
    <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="6" cy="6" r="1.2" stroke="currentColor" strokeWidth="0.7" />
  </svg>
);

const PromoForm = ({ promoCode, setPromoCode, onSubmit, isLoading, className = '', inputWidth = 'w-52' }) => (
  <form onSubmit={onSubmit} className={`flex items-center gap-2 ${className}`}>
    <div className={`relative ${inputWidth}`}>
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <SigilIcon />
      </span>
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
        placeholder="ENTER CODE..."
        style={{
          fontFamily: '"Orbitron", sans-serif',
          background: '#d5d0c0',
          border: '1px solid #bfbaa7',
          color: promoCode ? '#040405' : '#8a7a60',
          boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.08)',
          fontSize: '10px',
        }}
        className="w-full pl-8 pr-3 py-1.5 uppercase tracking-widest transition-all focus:outline-none focus:border-nier-mid"
        disabled={isLoading}
      />
    </div>
    <button type="submit" disabled={isLoading} className="btn-nier py-1.5 px-4 text-[8px] disabled:opacity-40">
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

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out.'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top rule */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7, #585046, #bfbaa7, transparent)' }} />

      {/* Main bar */}
      <div style={{ background: 'linear-gradient(180deg, #e6e1d1 0%, #dedad0 100%)', borderBottom: '1px solid #bfbaa7', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Logo */}
            <div
              className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
              onClick={() => { navigate('/'); setMenuOpen(false); }}
            >
              <Gamepad2 className="w-6 h-6 transition-all group-hover:scale-110" style={{ color: '#3b3833' }} />
              <div className="flex flex-col leading-none">
                <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '9px', color: '#040405', letterSpacing: '0.15em' }}>
                  GAMES
                </span>
                <span className="hidden sm:block" style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '7px', color: '#8a7a60', letterSpacing: '0.25em' }}>
                  VAULT
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
                  <span className="hidden sm:inline px-2 py-1" style={{
                    fontFamily: '"Press Start 2P", monospace', fontSize: '7px',
                    color: '#3b3833', border: '1px solid #bfbaa7',
                    background: 'rgba(88,80,70,0.08)', letterSpacing: '0.15em',
                  }}>
                    ◈ ADMIN
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 transition-all hover:opacity-70"
                    style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', border: '1px solid #bfbaa7', color: '#585046', background: 'transparent', letterSpacing: '0.1em' }}
                  >
                    <LogOut className="w-3 h-3" />
                    <span className="hidden sm:inline">EXIT</span>
                  </button>
                </>
              )}
              {!isAdminPage && (
                <button
                  className="md:hidden p-1.5 transition-all"
                  style={{ border: '1px solid #bfbaa7', color: '#585046', background: 'transparent' }}
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

      {/* Mobile dropdown */}
      {!isAdminPage && menuOpen && (
        <div className="md:hidden px-4 py-3 flex justify-center" style={{ background: '#dedad0', borderBottom: '1px solid #bfbaa7' }}>
          <PromoForm promoCode={promoCode} setPromoCode={setPromoCode} onSubmit={handleRedeem} isLoading={isLoading} className="w-full max-w-sm" inputWidth="flex-1" />
        </div>
      )}

      {/* Ticker */}
      {!isAdminPage && (
        <div className="h-6 flex items-center overflow-hidden" style={{ background: '#bfbaa7', borderBottom: '1px solid #a8a390' }}>
          <div className="ticker-wrap flex-1">
            <span className="ticker-inner px-8" style={{
              fontFamily: '"VT323", monospace', fontSize: '13px',
              color: '#585046', letterSpacing: '0.18em',
            }}>
              ◈ WELCOME TO GAMER HANDHELD SHOWROOM ◈&nbsp;&nbsp;&nbsp;
              ⬡ PSP · DS LITE · PS VITA · 3DS · 2DS ⬡&nbsp;&nbsp;&nbsp;
              ◈ ENTER PROMO CODE TO ACCESS ADMIN ◈&nbsp;&nbsp;&nbsp;
              ⬡ BEST HANDHELD COLLECTION 2000–2025 ⬡&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      )}

      {/* Bottom rule */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7, #585046, #bfbaa7, transparent)' }} />
    </nav>
  );
};

export default Navbar;
