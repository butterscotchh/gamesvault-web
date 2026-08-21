import { useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCarousel from '../components/carousel/ProductCarousel';
import HandheldShowcase from '../components/3D/HandheldShowcase';
import { Cpu, Zap, Shield, ChevronDown } from 'lucide-react';

const stats = [
  { value: '50+', label: 'DEVICES', icon: Cpu },
  { value: '99%', label: 'AUTHENTIC', icon: Shield },
  { value: '24H', label: 'SUPPORT', icon: Zap },
];

const MainPage = () => {
  const heroRef = useRef(null);

  const scrollToShowcase = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-black text-slate-200 overflow-x-hidden">
      <Navbar />

      <main className="pt-16">
        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col items-center justify-center bg-cyber-grid bg-grid-size overflow-hidden"
        >
          {/* Radial glow backdrop */}
          <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

          {/* Animated corner accents */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyber-cyan opacity-40 animate-pulse-slow" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyber-cyan opacity-40 animate-pulse-slow" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyber-green opacity-30 animate-pulse-slow" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyber-green opacity-30 animate-pulse-slow" />

          {/* Vertical scan line */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent pointer-events-none" />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* System badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-cyber-green/40 bg-cyber-green/5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-cyber-green font-mono text-xs tracking-[0.3em]">SYSTEM ONLINE</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-none">
              <span className="block text-white">GAMING</span>
              <span className="block text-neon-cyan animate-flicker">HANDHELD</span>
              <span className="block text-white text-3xl md:text-4xl font-light tracking-[0.2em] mt-2">
                SHOWROOM
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 my-5">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-cyber-cyan/60" />
              <div className="w-2 h-2 border border-cyber-cyan rotate-45" />
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-cyber-cyan/60" />
            </div>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light mb-10">
              Temukan koleksi gaming handheld terbaik dari berbagai generasi.
              <span className="text-cyber-cyan"> PSP, DS, PS Vita, 3DS</span> dan masih banyak lagi.
            </p>            

            {/* CTA */}
            <button
              onClick={scrollToShowcase}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan font-mono font-bold tracking-[0.2em] text-sm rounded-sm hover:bg-cyber-cyan hover:text-cyber-black transition-all duration-300 shadow-neon-sm hover:shadow-neon-cyan clip-corner"
            >
              <Zap className="w-4 h-4 group-hover:animate-spin" />
              EXPLORE DEVICES
            </button>
          </div>
        </section>

        {/* ── 3D SHOWCASE ── */}
        <section id="showcase">
          <HandheldShowcase />
        </section>

        {/* ── PRODUCTS ── */}
        <section className="py-20 bg-cyber-dark relative">
          {/* Section header decoration */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />

          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              {/* Label */}
              <p className="font-mono text-xs tracking-[0.4em] text-cyber-green mb-3">
                // INVENTORY
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                OUR <span className="text-neon-cyan">PRODUCTS</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-16 bg-cyber-border" />
                <div className="w-1.5 h-1.5 bg-cyber-cyan rotate-45" />
                <div className="h-px w-16 bg-cyber-border" />
              </div>
              <p className="text-slate-500 mt-4 font-light">
                Koleksi handheld terbaik untuk kamu
              </p>
            </div>

            <ProductCarousel />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
