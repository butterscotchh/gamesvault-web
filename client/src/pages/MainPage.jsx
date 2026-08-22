import { useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCarousel from '../components/carousel/ProductCarousel';
import HandheldShowcase from '../components/3D/HandheldShowcase';
import { Gamepad2, Star, ChevronDown } from 'lucide-react';

const stats = [
  { value: '50+', label: 'DEVICES',   color: '#9060d0', glow: '#c9a8f5' },
  { value: '99%', label: 'AUTHENTIC', color: '#3a80c0', glow: '#a8d8f5' },
  { value: '24H', label: 'SUPPORT',   color: '#2a9a60', glow: '#a8e8c8' },
];

const StarDeco = ({ className, size = 16, color, delay = '0s' }) => (
  <Star
    className={`absolute animate-float opacity-70 pointer-events-none ${className}`}
    style={{ width: size, height: size, color, filter: `drop-shadow(0 0 5px ${color})`, animationDelay: delay }}
    fill="currentColor"
  />
);

const MainPage = () => {
  const scrollToShowcase = () =>
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#f0eaff', color: '#4a3570' }}>
      <Navbar />

      {/* pt-20: 56px bar + 24px ticker */}
      <main className="pt-20">

        {/* ── HERO ── */}
        <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden starfield">
          {/* Soft gradient bg */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% -5%, #c9a8f550 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, #a8d8f530 0%, transparent 45%), linear-gradient(180deg, #f0eaff 0%, #e8deff 100%)',
          }} />

          {/* Floating star decorations */}
          <StarDeco className="top-16 left-14"    size={18} color="#f5a8d0" delay="0s"   />
          <StarDeco className="top-28 right-16"   size={12} color="#c9a8f5" delay="0.5s" />
          <StarDeco className="top-44 left-1/4"   size={14} color="#a8e8c8" delay="1s"   />
          <StarDeco className="bottom-44 right-14" size={18} color="#f5e8a8" delay="0.8s" />
          <StarDeco className="bottom-36 left-20"  size={12} color="#a8d8f5" delay="1.5s" />
          <StarDeco className="top-36 right-1/4"   size={10} color="#f5c8a8" delay="0.3s" />
          <StarDeco className="bottom-20 left-1/3" size={10} color="#f0b8c8" delay="1.2s" />

          {/* Soft horizontal lines */}
          <div className="absolute top-1/3 left-0 right-0 h-px opacity-30 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #c9a8f5, #a8d8f5, transparent)' }} />
          <div className="absolute bottom-1/3 left-0 right-0 h-px opacity-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #a8e8c8, #f5a8d0, transparent)' }} />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border-2" style={{
              borderColor: '#c9a8f5',
              background: '#c9a8f520',
              boxShadow: '0 0 10px #c9a8f540, 2px 2px 0 #b89ee8',
            }}>
              <span className="w-2 h-2 rounded-full animate-blink" style={{ background: '#a8e8c8', boxShadow: '0 0 6px #a8e8c8' }} />
              <span className="text-[8px] tracking-[0.35em]" style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#2a9a60',
                textShadow: '0 0 6px #a8e8c8',
              }}>
                ★ PLAYER ONE START ★
              </span>
            </div>

            {/* Main title */}
            <div className="mb-2">
              <h1
                className="font-black leading-none tracking-tight"
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 'clamp(36px, 7vw, 72px)',
                  background: 'linear-gradient(180deg, #4c1d95 0%, #7c3aed 50%, #9333ea 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 10px rgba(124, 58, 237, 0.25))',
                }}
              >
                GAMING
              </h1>
              <h1
                className="font-black leading-none tracking-tight"
                style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: 'clamp(36px, 7vw, 72px)',
                  background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'rainbowShift 4s linear infinite',
                  filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.25))',
                }}
              >
                HANDHELD
              </h1>
              <p className="mt-3 tracking-[0.5em]" style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 'clamp(9px, 1.8vw, 16px)',
                color: '#3a80c0',
                textShadow: '0 0 8px #a8d8f5',
              }}>
                S H O W R O O M
              </p>
            </div>

            {/* Star divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, #f5a8d0)' }} />
              <Star className="w-4 h-4 animate-spin-slow" fill="currentColor" style={{ color: '#f5a8d0', filter: 'drop-shadow(0 0 5px #f5a8d0)' }} />
              <Star className="w-3 h-3" fill="currentColor" style={{ color: '#c9a8f5', filter: 'drop-shadow(0 0 4px #c9a8f5)' }} />
              <Star className="w-4 h-4 animate-spin-slow" fill="currentColor" style={{ color: '#a8d8f5', filter: 'drop-shadow(0 0 5px #a8d8f5)', animationDirection: 'reverse' }} />
              <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, #f5a8d0, transparent)' }} />
            </div>

            <p className="max-w-xl mx-auto leading-relaxed mb-10" style={{
              fontFamily: '"VT323", monospace',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              color: '#4a3070',
              letterSpacing: '0.05em',
            }}>
              Temukan koleksi gaming handheld terbaik dari berbagai generasi.{' '}
              <span style={{ color: '#3a80c0', textShadow: '0 0 5px #a8d8f5' }}>PSP, DS, PS Vita, 3DS</span>{' '}
              dan masih banyak lagi!
            </p>            

            {/* CTA */}
            <button onClick={scrollToShowcase} className="btn-y2k inline-flex items-center gap-3">
              <Gamepad2 className="w-4 h-4" />
              EXPLORE NOW
            </button>
          </div>

          {/* Scroll hint */}
          <button
            onClick={scrollToShowcase}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity animate-bounce"
            aria-label="Scroll down"
          >
            <span className="text-[7px] tracking-widest" style={{ fontFamily: '"Press Start 2P", monospace', color: '#a8d8f5' }}>
              SCROLL
            </span>
            <ChevronDown className="w-4 h-4" style={{ color: '#a8d8f5' }} />
          </button>
        </section>

        {/* ── 3D SHOWCASE ── */}
        <section id="showcase">
          <HandheldShowcase />
        </section>

        {/* ── PRODUCTS ── */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #e8deff 0%, #f0eaff 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #c9a8f5, #a8d8f5, transparent)' }} />

          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-[8px] tracking-[0.5em] mb-4" style={{
                fontFamily: '"Press Start 2P", monospace',
                color: '#2a9a60',
                textShadow: '0 0 6px #a8e8c8',
              }}>
                ★ ITEM SELECT ★
              </p>
              <h2 className="font-black text-rainbow" style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: 'clamp(24px, 5vw, 48px)',
                background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'rainbowShift 4s linear infinite',
                filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.25))',
              }}>
                OUR PRODUCTS
              </h2>
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-0.5 w-16" style={{ background: 'linear-gradient(90deg, transparent, #f5a8d0)' }} />
                <Star className="w-3 h-3" fill="currentColor" style={{ color: '#f5a8d0', filter: 'drop-shadow(0 0 4px #f5a8d0)' }} />
                <Star className="w-4 h-4" fill="currentColor" style={{ color: '#f5e8a8', filter: 'drop-shadow(0 0 5px #f5e8a8)' }} />
                <Star className="w-3 h-3" fill="currentColor" style={{ color: '#a8d8f5', filter: 'drop-shadow(0 0 4px #a8d8f5)' }} />
                <div className="h-0.5 w-16" style={{ background: 'linear-gradient(90deg, #f5a8d0, transparent)' }} />
              </div>
              <p className="mt-4" style={{ fontFamily: '"VT323", monospace', fontSize: '20px', color: '#4a3070', letterSpacing: '0.08em' }}>
                Koleksi handheld terbaik untuk kamu
              </p>
            </div>
            <ProductCarousel />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #a8d8f5, #c9a8f5, transparent)' }} />
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
