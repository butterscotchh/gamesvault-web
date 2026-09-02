import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import DeviceModel from './DeviceModel';
import ColorPicker from '../common/ColorPicker';
import { RotateCcw } from 'lucide-react';

const devices = ['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS'];

const SigilCornerTL = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: '#585046' }}>
    <line x1="0" y1="0" x2="32" y2="0" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="0" x2="0" y2="32" stroke="currentColor" strokeWidth="1" />
    <line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="0.5" />
    <line x1="8" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <line x1="12" y1="0" x2="12" y2="5" stroke="currentColor" strokeWidth="0.5" />
    <line x1="0" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const SigilCornerBR = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: '#585046' }}>
    <line x1="32" y1="32" x2="0"  y2="32" stroke="currentColor" strokeWidth="1" />
    <line x1="32" y1="32" x2="32" y2="0"  stroke="currentColor" strokeWidth="1" />
    <line x1="24" y1="24" x2="8"  y2="24" stroke="currentColor" strokeWidth="0.5" />
    <line x1="24" y1="24" x2="24" y2="8"  stroke="currentColor" strokeWidth="0.5" />
    <circle cx="24" cy="24" r="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <line x1="20" y1="32" x2="20" y2="27" stroke="currentColor" strokeWidth="0.5" />
    <line x1="32" y1="20" x2="27" y2="20" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const HandheldShowcase = () => {
  const [selectedColor, setSelectedColor] = useState('#2d2d2d');

  const colors = [
    { name: 'Onyx',   value: '#2d2d2d' },
    { name: 'White',  value: '#f5f5f5' },
    { name: 'Silver', value: '#c0c0c0' },
    { name: 'Red',    value: '#dc2626' },
    { name: 'Blue',   value: '#2563eb' },
    { name: 'Green',  value: '#16a34a' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Gold',   value: '#d4af37' },
  ];

  const getDevicePosition = (index) => {
    const positions = [[-3.5,0,0],[-1.8,0,0],[0,0,0],[1.8,0,0],[3.5,0,0]];
    return positions[index] || [index * 2 - 4, 0, 0];
  };

  return (
    <div className="w-full py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #bfbaa7 0%, #ccc7b5 50%, #bfbaa7 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #a8a390, #585046, #a8a390, transparent)' }} />

      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#585046', letterSpacing: '0.4em', marginBottom: '12px' }}>
            ◈ 3D DISPLAY MODE ◈
          </p>
          <h2 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(20px, 4vw, 38px)', fontWeight: 900, color: '#040405' }}>
            INTERACTIVE SHOWROOM
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #a8a390)' }} />
            <div style={{ width: 6, height: 6, background: '#585046', transform: 'rotate(45deg)' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #a8a390, transparent)' }} />
          </div>
          <p style={{ fontFamily: '"VT323", monospace', fontSize: '17px', color: '#585046', letterSpacing: '0.1em' }}>
            Drag to rotate &bull; Scroll to zoom &bull; Pick a color below
          </p>
        </div>

        {/* Color picker */}
        <div className="flex justify-center mb-8">
          <ColorPicker colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
        </div>

        {/* Window frame */}
        <div className="relative overflow-hidden" style={{ border: '1px solid #a8a390', boxShadow: '4px 4px 0 #a8a390, 0 0 24px rgba(0,0,0,0.06)' }}>

          {/* Title bar */}
          <div className="nier-titlebar flex items-center justify-between">
            <span>◈ 3D HANDHELD VIEWER v2.0 ◈</span>
            <div className="flex gap-1.5">
              {['#bfbaa7', '#a8a390', '#585046'].map(c => (
                <div key={c} className="w-2.5 h-2.5" style={{ background: c, outline: '1px solid rgba(0,0,0,0.2)' }} />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-[400px] scanlines" style={{ background: '#d5d0c0' }}>
            <div className="absolute top-0 left-0 z-10 pointer-events-none" style={{ opacity: 0.6 }}><SigilCornerTL /></div>
            <div className="absolute bottom-0 right-0 z-10 pointer-events-none" style={{ opacity: 0.6 }}><SigilCornerBR /></div>
            <div className="absolute top-0 right-0 z-10 pointer-events-none" style={{ opacity: 0.4, transform: 'scaleX(-1)' }}><SigilCornerTL /></div>
            <div className="absolute bottom-0 left-0 z-10 pointer-events-none" style={{ opacity: 0.4, transform: 'scaleX(-1)' }}><SigilCornerBR /></div>

            <div className="absolute bottom-3 right-10 z-10 pointer-events-none flex items-center gap-1.5 opacity-50">
              <RotateCcw className="w-3 h-3" style={{ color: '#585046' }} />
              <span style={{ fontFamily: '"VT323", monospace', fontSize: '13px', color: '#585046', letterSpacing: '0.12em' }}>AUTO ROTATE</span>
            </div>

            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
              <color attach="background" args={['#d5d0c0']} />
              <fog attach="fog" args={['#d5d0c0', 14, 24]} />
              <OrbitControls enableZoom enablePan={false} minDistance={4} maxDistance={15} autoRotate autoRotateSpeed={1.5} />
              <ambientLight intensity={0.9} color="#e6e1d1" />
              <directionalLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
              <directionalLight position={[-10, -5, -5]} intensity={0.4} color="#e6e1d1" />
              <pointLight position={[0, 5, 0]} intensity={0.3} color="#bfbaa7" />
              <Environment preset="apartment" />
              <Suspense fallback={null}>
                {devices.map((device, index) => (
                  <DeviceModel key={device} device={device} color={selectedColor} position={getDevicePosition(index)} />
                ))}
              </Suspense>
            </Canvas>
          </div>

          {/* Status bar */}
          <div className="px-3 py-1.5 flex items-center justify-between" style={{ background: '#bfbaa7', borderTop: '1px solid #a8a390' }}>
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#3b3833', letterSpacing: '0.12em' }}>
              ◈ RENDER ACTIVE
            </span>
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#8a7a60', letterSpacing: '0.1em' }}>
              {devices.length} MODELS LOADED
            </span>
          </div>
        </div>

        {/* Device labels */}
        <div className="flex justify-center gap-4 md:gap-10 mt-5">
          {devices.map((device) => (
            <span key={device} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '8px', color: '#585046', letterSpacing: '0.1em' }}>
              {device}
            </span>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #a8a390, #585046, #a8a390, transparent)' }} />
    </div>
  );
};

export default HandheldShowcase;
