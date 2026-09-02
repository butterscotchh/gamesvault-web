import { Gamepad2, Instagram, Twitter, Youtube } from 'lucide-react';

const SigilFooter = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ color: '#585046', opacity: 0.1 }}>
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="32" cy="32" r="5"  stroke="currentColor" strokeWidth="0.7" />
    <line x1="32" y1="4"  x2="32" y2="60" stroke="currentColor" strokeWidth="0.4" />
    <line x1="4"  y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="0.4" />
    <line x1="12" y1="12" x2="52" y2="52" stroke="currentColor" strokeWidth="0.3" />
    <line x1="52" y1="12" x2="12" y2="52" stroke="currentColor" strokeWidth="0.3" />
    <circle cx="32" cy="4"  r="1.5" fill="currentColor" />
    <circle cx="32" cy="60" r="1.5" fill="currentColor" />
    <circle cx="4"  cy="32" r="1.5" fill="currentColor" />
    <circle cx="60" cy="32" r="1.5" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#bfbaa7', borderTop: '1px solid #a8a390' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #a8a390, #585046, #a8a390, transparent)' }} />

      {/* Background sigils */}
      <div className="absolute top-6 left-6 pointer-events-none"><SigilFooter /></div>
      <div className="absolute top-6 right-6 pointer-events-none" style={{ transform: 'scaleX(-1)' }}><SigilFooter /></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"><SigilFooter /></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Gamepad2 className="w-6 h-6" style={{ color: '#3b3833' }} />
              <div>
                <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: '#040405', letterSpacing: '0.15em' }}>
                  GAMER
                </div>
                <div style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '7px', color: '#585046', letterSpacing: '0.25em' }}>
                  HANDHELD
                </div>
              </div>
            </div>
            <p style={{ fontFamily: '"VT323", monospace', fontSize: '17px', color: '#585046', letterSpacing: '0.06em', lineHeight: 1.6 }}>
              Showroom untuk para pecinta gaming handheld.<br />
              Temukan koleksi PSP, DS, PS Vita, dan lainnya.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-1.5 h-1.5 animate-blink" style={{ background: '#3b3833', display: 'inline-block' }} />
              <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#585046', letterSpacing: '0.2em' }}>
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#3b3833', letterSpacing: '0.2em', marginBottom: '16px' }}>
              ◈ MENU
            </h4>
            <ul className="space-y-3">
              {['HOME', 'PRODUCTS', 'ABOUT'].map(label => (
                <li key={label}>
                  <a href="#"
                    style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#8a7a60', letterSpacing: '0.1em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#040405'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8a7a60'; }}
                  >
                    <span style={{ color: '#a8a390' }}>›</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#3b3833', letterSpacing: '0.2em', marginBottom: '16px' }}>
              ◈ SOCIAL
            </h4>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{ background: '#ccc7b5', border: '1px solid #a8a390', boxShadow: '2px 2px 0 #a8a390', color: '#585046' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b3833'; e.currentTarget.style.color = '#040405'; e.currentTarget.style.background = '#dedad0'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#a8a390'; e.currentTarget.style.color = '#585046'; e.currentTarget.style.background = '#ccc7b5'; }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #a8a390' }}>
          <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#8a7a60', letterSpacing: '0.1em' }}>
            &copy; {currentYear} GAMERHANDHELD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <div style={{ width: 5, height: 5, background: '#8a7a60', transform: 'rotate(45deg)' }} />
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#8a7a60', letterSpacing: '0.1em' }}>
              v2.0 NieR EDITION
            </p>
            <div style={{ width: 5, height: 5, background: '#8a7a60', transform: 'rotate(45deg)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
