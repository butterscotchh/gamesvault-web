import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCarousel from '../components/carousel/ProductCarousel';
import HandheldShowcase from '../components/3D/HandheldShowcase';
import { Gamepad2, ChevronDown } from 'lucide-react';

import sigil1 from '../assets/sigils/cybersigilism.png';
import sigil2 from '../assets/sigils/cybersigilism2.png';
import sigil3 from '../assets/sigils/cybersigilism3.jpg';
import sigil4 from '../assets/sigils/cybersigilism4.png';
import sigil5 from '../assets/sigils/cybersigilism5.png';

const Sigil = ({
  src,
  className = '',
  size = 160,
  opacity = 0,
  delay = '0s',
  duration = '7s',
  rotate = 0,
  flipX = false,
  flipY = false,
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={`absolute pointer-events-none select-none hidden sm:block ${className}`}
    style={{
      width: size,
      height: 'auto',
      opacity,
      mixBlendMode: 'multiply',
      filter: 'grayscale(1)',
      animation: `sigilFade ${duration} ease-in-out infinite`,
      animationDelay: delay,
      transform: `rotate(${rotate}deg) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
      transformOrigin: 'center',
    }}
  />
);

/* Small inline sigil used mid-divider, next to text — not absolutely positioned */
const SigilMark = ({ src, size = 20, opacity = 0.5, rotate = 0 }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    className="select-none"
    style={{
      width: size,
      height: 'auto',
      opacity,
      mixBlendMode: 'multiply',
      filter: 'grayscale(1)',
      transform: `rotate(${rotate}deg)`,
    }}
  />
);

const MainPage = () => {
  const scrollToShowcase = () =>
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#e6e1d1', color: '#040405' }}>
      <Navbar />

      <main className="pt-[82px]">

        {/* ── HERO ── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle radial */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(88,80,70,0.08) 0%, transparent 55%), linear-gradient(180deg, #e6e1d1 0%, #dedad0 100%)',
          }} />

          {/* Thin vertical rules */}
          <div className="absolute top-0 bottom-0 left-8 w-px pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, #bfbaa7, transparent)' }} />
          <div className="absolute top-0 bottom-0 right-8 w-px pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, #bfbaa7, transparent)' }} />

          {/* Sigil decorations — scattered around the edges so they never
              collide with the centered headline / CTA */}
          {/* <Sigil src={sigil2} className="top-14 left-6 md:left-10" size={150} opacity={0.10} delay="0s"   duration="8s" rotate={-4} />
          <Sigil src={sigil4} className="top-16 right-6 md:right-14" size={120} opacity={0.09} delay="1.5s" duration="9s" rotate={12} />
          <Sigil src={sigil5} className="top-1/3 left-4 md:left-10 hidden lg:block" size={110} opacity={0.07} delay="3s" duration="7s" rotate={-16} flipX />
          <Sigil src={sigil3} className="bottom-1/3 right-4 md:right-12 hidden lg:block" size={130} opacity={0.08} delay="0.8s" duration="10s" rotate={9} />
          <Sigil src={sigil4} className="bottom-20 left-8 md:left-16" size={105} opacity={0.08} delay="2s" duration="8s" rotate={-160} flipY />
          <Sigil src={sigil5} className="bottom-14 right-8 md:right-16" size={115} opacity={0.07} delay="4s" duration="7s" rotate={18} /> */}
          <Sigil src={sigil1} className="top-[10px] left-[-10px] md:right-6 -translate-y-1/2 opacity-0 lg:block`" size={350} opacity={0} delay="1s" duration="11s" />
          <Sigil src={sigil5} className="bottom-4 right-2 md:right-6 -translate-y-1/2lg:block" size={350} opacity={0} delay="1s" rotate={180} invert={true} duration="11s" />


          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5" style={{
              border: '1px solid #bfbaa7',
              background: 'rgba(88,80,70,0.06)',
            }}>
              <span className="w-1.5 h-1.5 animate-blink" style={{ background: '#585046', display: 'inline-block' }} />
              <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#585046', letterSpacing: '0.3em' }}>
                SYSTEM ONLINE
              </span>
            </div>

            {/* Title */}
            <div className="mb-2">
              <h1 style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#040405',
              }}>
                GAMES
              </h1>
              <h1 style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #3b3833, #040405, #585046, #040405, #3b3833)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'rainbowShift 6s linear infinite',
              }}>
                VAULT
              </h1>
              <p className="mt-4" style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: 'clamp(8px, 1.5vw, 13px)',
                color: '#8a7a60',
                letterSpacing: '0.5em',
              }}>
                S H O W R O O M
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px flex-1 max-w-28" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7)' }} />
              <SigilMark src={sigil2} size={22} opacity={0.55} />
              <div className="h-px flex-1 max-w-28" style={{ background: 'linear-gradient(90deg, #bfbaa7, transparent)' }} />
            </div>

            {/* Body text */}
            <p className="max-w-xl mx-auto leading-relaxed mb-10" style={{
              fontFamily: '"VT323", monospace',
              fontSize: 'clamp(16px, 2.2vw, 21px)',
              color: '#585046',
              letterSpacing: '0.06em',
            }}>
              Temukan koleksi gaming handheld terbaik dari berbagai generasi.{' '}
              <span style={{ color: '#3b3833', fontWeight: 700 }}>PSP, DS, PS Vita, 3DS</span>{' '}
              dan masih banyak lagi.
            </p>

            {/* CTA */}
            <button onClick={scrollToShowcase} className="btn-nier inline-flex items-center gap-3">
              <Gamepad2 className="w-4 h-4" />
              EXPLORE NOW
            </button>
          </div>

          {/* Scroll hint */}
          <button
            onClick={scrollToShowcase}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 hover:opacity-70 transition-opacity animate-bounce"
            aria-label="Scroll down"
          >
            <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '7px', color: '#8a7a60', letterSpacing: '0.25em' }}>SCROLL</span>
            <ChevronDown className="w-4 h-4" style={{ color: '#8a7a60' }} />
          </button>
        </section>

        {/* ── 3D SHOWCASE ── */}
        <section id="showcase">
          <HandheldShowcase />
        </section>

        {/* ── PRODUCTS ── */}
        <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #dedad0 0%, #e6e1d1 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7, #585046, #bfbaa7, transparent)' }} />

          <Sigil src={sigil3} className="top-6 left-6 md:left-10" size={110} opacity={0.08} delay="0s" duration="9s" rotate={-6} />
          <Sigil src={sigil1} className="bottom-6 right-6 md:right-10" size={90} opacity={0.07} delay="2s" duration="10s" rotate={180} />

          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#8a7a60', letterSpacing: '0.4em', marginBottom: '12px' }}>
                ◈ INVENTORY ◈
              </p>
              <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(24px, 5vw, 46px)', fontWeight: 900, color: '#040405' }}>
                OUR PRODUCTS
              </h2>
              <div className="flex items-center justify-center gap-4 mt-5">
                <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7)' }} />
                <SigilMark src={sigil5} size={18} opacity={0.6} rotate={90} />
                <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, #bfbaa7, transparent)' }} />
              </div>
              <p className="mt-4" style={{ fontFamily: '"VT323", monospace', fontSize: '19px', color: '#8a7a60', letterSpacing: '0.1em' }}>
                Koleksi handheld terbaik untuk kamu
              </p>
            </div>
            <ProductCarousel />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #bfbaa7, #585046, #bfbaa7, transparent)' }} />
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default MainPage;