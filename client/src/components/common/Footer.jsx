import { Gamepad2, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-dark border-t border-cyber-border relative">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-cyber-cyan drop-shadow-[0_0_6px_#00f5ff]" />
              <span className="text-lg font-black tracking-wider">
                <span className="text-neon-cyan">GAMER</span>
                <span className="text-slate-400">HANDHELD</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              Showroom untuk para pecinta gaming handheld. Temukan koleksi
              PSP, DS, PS Vita, dan lainnya di sini.
            </p>
            {/* Status badge */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-xs text-cyber-green/70 tracking-[0.2em]">ALL SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.3em] text-cyber-cyan mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'About'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-cyber-cyan text-sm font-mono tracking-wide transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="text-cyber-cyan/0 group-hover:text-cyber-cyan transition-colors">›</span>
                    {link.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.3em] text-cyber-cyan mb-4">FOLLOW US</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter,   label: 'Twitter' },
                { icon: Youtube,   label: 'Youtube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 border border-cyber-border bg-cyber-card hover:border-cyber-cyan hover:shadow-neon-sm text-slate-500 hover:text-cyber-cyan transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyber-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-slate-600 tracking-widest">
            &copy; {currentYear} GAMERHANDHELD. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-xs text-slate-700 tracking-widest">
            v1.0.0 · BUILD STABLE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
