import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import DeviceModel from './DeviceModel';
import ColorPicker from '../common/ColorPicker';
import { RotateCcw, Maximize2 } from 'lucide-react';

const devices = ['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS'];

const HandheldShowcase = () => {
  const [selectedColor, setSelectedColor] = useState('#2d2d2d');

  const colors = [
    { name: 'Onyx',    value: '#2d2d2d' },
    { name: 'White',   value: '#f5f5f5' },
    { name: 'Silver',  value: '#c0c0c0' },
    { name: 'Red',     value: '#dc2626' },
    { name: 'Blue',    value: '#2563eb' },
    { name: 'Green',   value: '#16a34a' },
    { name: 'Purple',  value: '#9333ea' },
    { name: 'Gold',    value: '#d4af37' },
  ];

  const getDevicePosition = (index) => {
    const positions = [
      [-3.5, 0, 0],
      [-1.8, 0, 0],
      [0,    0, 0],
      [1.8,  0, 0],
      [3.5,  0, 0],
    ];
    return positions[index] || [index * 2 - 4, 0, 0];
  };

  return (
    <div className="w-full bg-cyber-black py-16 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-[0.4em] text-cyber-green mb-3">// 3D ENGINE</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            INTERACTIVE <span className="text-neon-cyan">SHOWROOM</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 mb-4">
            <div className="h-px w-16 bg-cyber-border" />
            <div className="w-1.5 h-1.5 bg-cyber-cyan rotate-45" />
            <div className="h-px w-16 bg-cyber-border" />
          </div>
          <p className="text-slate-500 text-sm font-light">
            Drag to rotate &bull; Scroll to zoom &bull; Pick a color below
          </p>
        </div>

        {/* Color picker */}
        <div className="flex justify-center mb-8">
          <ColorPicker
            colors={colors}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>

        {/* Canvas container */}
        <div className="relative w-full h-[420px] rounded-sm overflow-hidden border border-cyber-border bg-cyber-dark shadow-card-glow">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyber-green z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyber-green z-10 pointer-events-none" />

          {/* HUD label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="font-mono text-[10px] text-cyber-cyan/50 tracking-[0.3em]">3D · RENDER · ACTIVE</span>
          </div>

          {/* Controls hint */}
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 opacity-40">
            <RotateCcw className="w-3 h-3 text-cyber-cyan" />
            <span className="font-mono text-[10px] text-cyber-cyan tracking-widest">AUTO-ROTATE</span>
          </div>

          <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
            <color attach="background" args={['#F2EFE7']} />
            <fog attach="fog" args={['#0a0f1e', 12, 22]} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={4}
              maxDistance={15}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />

            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#00f5ff" />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#00f5ff" />
            <pointLight position={[0, -3, 2]} intensity={0.2} color="#00ff88" />

            <Environment preset="night" />

            <Suspense fallback={null}>
              {devices.map((device, index) => (
                <DeviceModel
                  key={device}
                  device={device}
                  color={selectedColor}
                  position={getDevicePosition(index)}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Device labels */}
        <div className="flex justify-center gap-4 md:gap-8 mt-4">
          {devices.map((device) => (
            <span key={device} className="font-mono text-xs text-slate-500 tracking-widest hover:text-cyber-cyan transition-colors">
              {device}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green/30 to-transparent" />
    </div>
  );
};

export default HandheldShowcase;
