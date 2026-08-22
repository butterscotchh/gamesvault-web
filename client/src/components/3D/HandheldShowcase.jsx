import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import DeviceModel from './DeviceModel';
import ColorPicker from '../common/ColorPicker';
import { Star, RotateCcw } from 'lucide-react';

const devices = ['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS'];

const deviceColors = ['#c050e0', '#3a80c0', '#2a9a60', '#c08800', '#d06040'];

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
    <div className="w-full py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0eaff 0%, #e8deff 50%, #f0eaff 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #c9a8f5, #f5a8d0, transparent)' }} />

      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[8px] tracking-[0.5em] mb-4" style={{
            fontFamily: '"Press Start 2P", monospace',
            color: '#3a80c0',
            textShadow: '0 0 6px #a8d8f5',
          }}>
            ✦ 3D DISPLAY MODE ✦
          </p>
          <h2 className="font-black text-chrome mb-1" style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(22px, 4vw, 40px)',
            background: 'linear-gradient(180deg, #4c1d95 0%, #7c3aed 50%, #9333ea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 10px rgba(124, 58, 237, 0.25))',
          }}>
            INTERACTIVE SHOWROOM
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 mb-4">
            <div className="h-0.5 w-16" style={{ background: 'linear-gradient(90deg, transparent, #c9a8f5)' }} />
            <Star className="w-3 h-3" fill="currentColor" style={{ color: '#c9a8f5', filter: 'drop-shadow(0 0 4px #c9a8f5)' }} />
            <div className="h-0.5 w-16" style={{ background: 'linear-gradient(90deg, #c9a8f5, transparent)' }} />
          </div>
          <p style={{ fontFamily: '"VT323", monospace', fontSize: '18px', color: '#4a3070', letterSpacing: '0.08em' }}>
            Drag to rotate &bull; Scroll to zoom &bull; Pick a color below
          </p>
        </div>

        {/* Color picker */}
        <div className="flex justify-center mb-8">
          <ColorPicker colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
        </div>

        {/* Y2K window */}
        <div className="relative overflow-hidden" style={{
          border: '3px solid #b89ee8',
          boxShadow: '0 0 0 1px #c9a8f540, 6px 6px 0 #c0b0e0, 0 0 30px #c9a8f520',
        }}>
          {/* Title bar */}
          <div className="y2k-titlebar flex items-center justify-between px-3 py-1.5">
            <span>★ 3D HANDHELD VIEWER v2.0 ★</span>
            <div className="flex gap-1">
              {['#f5a8a8', '#f5e8a8', '#a8e8c8'].map(c => (
                <div key={c} className="w-3 h-3 rounded-full border" style={{ background: c, borderColor: 'rgba(74,53,112,0.2)' }} />
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="relative w-full h-[400px] scanlines" style={{ background: '#ede5ff' }}>
            {/* Corner star decorations */}
            {[
              { pos: 'top-2 left-2', color: '#f5a8d0', delay: '0s' },
              { pos: 'top-2 right-2', color: '#a8d8f5', delay: '0.7s' },
              { pos: 'bottom-2 left-2', color: '#a8e8c8', delay: '1.2s' },
              { pos: 'bottom-2 right-2', color: '#f5e8a8', delay: '0.4s' },
            ].map(({ pos, color, delay }) => (
              <Star key={pos} fill="currentColor" className={`absolute ${pos} w-4 h-4 z-10 pointer-events-none animate-float`}
                style={{ color, filter: `drop-shadow(0 0 4px ${color})`, animationDelay: delay }} />
            ))}

            {/* Auto-rotate label */}
            <div className="absolute bottom-3 right-10 z-10 pointer-events-none flex items-center gap-1 opacity-60">
              <RotateCcw className="w-3 h-3" style={{ color: '#a8d8f5' }} />
              <span style={{ fontFamily: '"VT323", monospace', fontSize: '13px', color: '#4a3070', letterSpacing: '0.1em' }}>AUTO ROTATE</span>
            </div>

            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
              <color attach="background" args={['#ede5ff']} />
              <fog attach="fog" args={['#ede5ff', 14, 24]} />
              <OrbitControls enableZoom enablePan={false} minDistance={4} maxDistance={15} autoRotate autoRotateSpeed={1.5} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
              <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#c9a8f5" />
              <pointLight position={[0, 5, 0]} intensity={0.6} color="#f5a8d0" />
              <pointLight position={[0, -3, 3]} intensity={0.3} color="#a8d8f5" />
              <Environment preset="dawn" />
              <Suspense fallback={null}>
                {devices.map((device, index) => (
                  <DeviceModel key={device} device={device} color={selectedColor} position={getDevicePosition(index)} />
                ))}
              </Suspense>
            </Canvas>
          </div>

          {/* Status bar */}
          <div className="px-3 py-1.5 flex items-center justify-between border-t-2" style={{ background: '#f0eaff', borderColor: '#b89ee8' }}>
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#2a9a60', textShadow: '0 0 5px #a8e8c8' }}>
              ● RENDER ACTIVE
            </span>
            <span style={{ fontFamily: '"VT323", monospace', fontSize: '14px', color: '#4a3070' }}>
              {devices.length} MODELS LOADED
            </span>
          </div>
        </div>

        {/* Device labels */}
        <div className="flex justify-center gap-4 md:gap-8 mt-5">
          {devices.map((device, i) => (
            <span key={device} style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '8px',
              color: deviceColors[i % deviceColors.length],
              textShadow: `0 0 5px ${deviceColors[i % deviceColors.length]}`,
              letterSpacing: '0.1em',
            }}>
              {device}
            </span>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #a8e8c8, #f5a8d0, transparent)' }} />
    </div>
  );
};

export default HandheldShowcase;
