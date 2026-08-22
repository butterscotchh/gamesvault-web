import { Gamepad2, Instagram, Twitter, Youtube, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #e8deff 0%, #f0eaff 100%)',
      borderTop: '3px solid #b89ee8',
    }}>
      {/* Top pastel rainbow stripe */}
      <div className="h-1.5 w-full" style={{
        background: 'linear-gradient(90deg, #f5a8d0, #c9a8f5, #a8d8f5, #a8e8c8, #f5e8a8, #f5c8a8, #f0b8c8, #f5a8d0)',
        backgroundSize: '200% auto',
        animation: 'rainbowShift 3s linear infinite',
      }} />

      {/* Soft starfield bg */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: 'radial-gradient(2px 2px at 10% 20%, #f5a8d0, transparent), radial-gradient(2px 2px at 40% 60%, #c9a8f5, transparent), radial-gradient(2px 2px at 70% 30%, #a8d8f5, transparent), radial-gradient(2px 2px at 88% 75%, #a8e8c8, transparent)',
      }} />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-7 h-7 animate-float" style={{ color: '#c9a8f5', filter: 'drop-shadow(0 0 6px #c9a8f5)' }} />
              <div>
                <div className="text-[11px] font-black tracking-widest text-rainbow" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                  GAMER
                </div>
                <div className="text-[8px] tracking-[0.3em]" style={{ fontFamily: '"Orbitron", sans-serif', color: '#5a3d8a' }}>
                  HANDHELD
                </div>
              </div>
            </div>
            <p style={{ fontFamily: '"VT323", monospace', fontSize: '18px', color: '#4a3070', letterSpacing: '0.05em', lineHeight: '1.5' }}>
              Showroom untuk para pecinta gaming handheld.<br />
              Temukan koleksi PSP, DS, PS Vita, dan lainnya!
            </p>
            {/* Status */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full animate-blink" style={{ background: '#2a9a60', boxShadow: '0 0 5px #a8e8c8' }} />
              <span style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '7px',
                color: '#2a9a60',
                textShadow: '0 0 5px #a8e8c8',
                letterSpacing: '0.15em',
              }}>
                ONLINE
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px',
              color: '#3a80c0',
              textShadow: '0 0 5px #a8d8f5',
              letterSpacing: '0.2em',
            }}>
              ★ MENU ★
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'HOME',     color: '#c0406a' },
                { label: 'PRODUCTS', color: '#3a80c0' },
                { label: 'ABOUT',    color: '#2a9a60' },
              ].map(({ label, color }) => (
                <li key={label}>
                  <a href="#" className="flex items-center gap-2 group transition-all"
                    style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#5a3d8a', letterSpacing: '0.1em', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color = color; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#b89ee8'; }}
                  >
                    <Star className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4" style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px',
              color: '#9060d0',
              textShadow: '0 0 5px #c9a8f5',
              letterSpacing: '0.2em',
            }}>
              ★ SOCIAL ★
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, color: '#f5a8d0' },
                { Icon: Twitter,   color: '#a8d8f5' },
                { Icon: Youtube,   color: '#f5c8a8' },
              ].map(({ Icon, color }, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 flex items-center justify-center transition-all hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, #f0eaff, #e8deff)',
                    border: `2px solid ${color}`,
                    boxShadow: `2px 2px 0 #c0b0e0, 0 0 8px ${color}40`,
                    color,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `2px 2px 0 #c0b0e0, 0 0 14px ${color}`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = `2px 2px 0 #c0b0e0, 0 0 8px ${color}40`; }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '2px solid #c9a8f5' }}>
          <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#5a3d8a', letterSpacing: '0.1em' }}>
            &copy; {currentYear} GAMERHANDHELD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <Star className="w-2.5 h-2.5" fill="currentColor" style={{ color: '#f5a8d0', filter: 'drop-shadow(0 0 3px #f5a8d0)' }} />
            <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#5a3d8a', letterSpacing: '0.1em' }}>
              v2.0 Y2K EDITION
            </p>
            <Star className="w-2.5 h-2.5" fill="currentColor" style={{ color: '#a8d8f5', filter: 'drop-shadow(0 0 3px #a8d8f5)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
